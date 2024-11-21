"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

const PerfilPage = () => {
  const { user } = useAuth(); // Obtenemos el UID desde el AuthContext
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false); // Modal de edición
  const [passwordModalOpen, setPasswordModalOpen] = useState(false); // Modal de validación de contraseña
  const [inputPassword, setInputPassword] = useState(""); // Estado para la contraseña ingresada
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Estado para el mensaje de error

  // Para el modal de edición de perfil
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numero_telefono: "",
    direccion: "",
    correo: "",
    fecha_nacimiento: "",
  });
  const [imageFile, setImageFile] = useState(null);  // Imagen seleccionada

  useEffect(() => {
    if (!user || !user.persona?.id_persona) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `https://api-women-security-app-544496114867.southamerica-west1.run.app/api/user?uid=${user.persona.id_persona}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener el perfil");
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleValidatePassword = () => {
    if (inputPassword === profileData?.perfil.password) {
      setShowPassword(true);
      setError("");
      setPasswordModalOpen(false); // Cierra el modal de validación de contraseña al validar correctamente
    } else {
      setError("Contraseña incorrecta.");
    }
  };

  const openEditModal = () => {
    setFormData({
      nombre: profileData?.persona?.nombre || "",
      apellido: profileData?.persona?.apellido || "",
      numero_telefono: profileData?.persona?.numero_telefono || "",
      direccion: profileData?.persona?.direccion || "",
      correo: profileData?.persona?.correo || "",
      fecha_nacimiento: profileData?.persona?.fecha_nacimiento || "",
    });
    setEditModalOpen(true); // Abre el modal de edición
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    dataToSend.append("id_persona", user.persona.id_persona);
    dataToSend.append("nombre", formData.nombre);
    dataToSend.append("apellido", formData.apellido);
    dataToSend.append("numero_telefono", formData.numero_telefono);
    dataToSend.append("direccion", formData.direccion);
    dataToSend.append("correo", formData.correo);
    dataToSend.append("fecha_nacimiento", formData.fecha_nacimiento);

    if (imageFile) {
      dataToSend.append("imagen_usuario", imageFile);
    }

    try {
      const response = await fetch(
        "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/editar-perfil",
        {
          method: "PUT",
          body: dataToSend,
        }
      );
      if (response.ok) {
        // Actualizar el estado del perfil con los nuevos datos
        const updatedProfile = await response.json();
        setProfileData((prevData) => ({
          ...prevData,
          persona: {
            ...prevData.persona,
            ...formData, // Actualiza la persona con los nuevos datos
          },
          perfil: {
            ...prevData.perfil,
            correo: formData.correo,
            imagen_usuario: imageFile ? URL.createObjectURL(imageFile) : prevData.perfil.imagen_usuario, // Si se sube una nueva imagen
          }
        }));
        alert("Perfil actualizado exitosamente.");
        setEditModalOpen(false); // Cierra el modal de edición
      } else {
        alert("Error al actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Ocurrió un error al actualizar el perfil.");
    }
  };

  if (loading) {
    return <p className="text-center text-white">Cargando perfil...</p>;
  }

  if (!profileData) {
    return <p className="text-center text-white">No se pudo cargar el perfil</p>;
  }

  const { persona, perfil } = profileData;

  return (
    <div className="container mx-auto mt-10 p-6 bg-[#1f0a1e] rounded-xl shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <img
          src={perfil.imagen_usuario || 'https://via.placeholder.com/150'}
          className="w-44 h-44 rounded-full mx-auto mb-4 shadow-lg"
        />
        <h1 className="text-3xl font-bold text-white">{`${persona.nombre} ${persona.apellido}`}</h1>
        <p className="text-gray-300">{perfil.tipo_usuario.descripcion || "Usuario"}</p>
      </div>

      {/* Información Personal */}
      <div className="bg-[#742d70] p-6 rounded-xl shadow-xl mb-6">
        <h2 className="text-xl mx-auto text-center font-semibold text-white mb-4">Información Personal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#5e215c] p-4 rounded-xl shadow-md text-white">
            <p><strong>Correo:</strong></p>
            <p>{persona.correo}</p>
          </div>
          <div className="bg-[#5e215c] p-4 rounded-xl shadow-md text-white">
            <p><strong>Teléfono:</strong></p>
            <p>{persona.numero_telefono}</p>
          </div>
          <div className="bg-[#5e215c] p-4 rounded-xl shadow-md text-white">
            <p><strong>RUT:</strong></p>
            <p>{persona.rut}</p>
          </div>
          <div className="bg-[#5e215c] p-4 rounded-xl shadow-md text-white">
            <p><strong>Fecha de Nacimiento:</strong></p>
            <p>{new Date(persona.fecha_nacimiento).toLocaleDateString()}</p>
          </div>
          <div className="bg-[#5e215c] p-4 rounded-xl shadow-md text-white">
            <p><strong>Dirección:</strong></p>
            <p>{persona.direccion}</p>
          </div>
        </div>
      </div>

      {/* Configuración de Perfil */}
      <div className="bg-[#742d70] p-6 rounded-xl shadow-lg">
        <h2 className="text-xl text-center font-semibold text-white mb-4">Configuración de Perfil</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#5e215c] p-4 rounded-xl shadow-md text-white">
            <p><strong>Correo:</strong></p>
            <p>{perfil.correo}</p>
          </div>
          <div className="bg-[#5e215c] p-4 rounded-xl shadow-md text-white">
            <p><strong>Contraseña:</strong></p>
            <div className="flex items-center">
              <p>{showPassword ? perfil.password : "********"}</p>
              {!showPassword && (
                <EyeIcon
                  className="h-5 w-5 text-white ml-2 cursor-pointer"
                  onClick={() => setPasswordModalOpen(true)} // Solo abre el modal de contraseña
                />
              )}
            </div>
          </div>
          <div className="bg-[#5e215c] p-4 rounded-xl shadow-md text-white">
            <p><strong>Nombre de Usuario:</strong></p>
            <p>{perfil.nombre_usuario || "N/A"}</p>
          </div>
        </div>
        <button
          onClick={openEditModal} // Abre el modal de edición
          className="mt-4 w-full bg-[#5a2357] text-white py-2 rounded-xl hover:bg-[#d65ed0]"
        >
          Editar Perfil
        </button>
      </div>

      {/* Modal para validar la contraseña */}
      {passwordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1f0a1e] p-6 rounded-xl shadow-lg w-[30%]">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">Validar Contraseña</h2>
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer"
                onClick={() => setPasswordModalOpen(false)} // Cierra el modal de contraseña
              />
            </div>
            <div className="mt-4">
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#742d70] text-white outline-none"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                onClick={handleValidatePassword}
                className="mt-4 w-full bg-[#834081] text-white py-2 rounded-lg hover:bg-[#b148ab]"
              >
                Validar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar perfil */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1f0a1e] p-6 rounded-xl shadow-lg w-[30%]">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">Editar Perfil</h2>
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer"
                onClick={() => setEditModalOpen(false)} // Cierra el modal de edición
              />
            </div>
            <form onSubmit={handleEditSubmit} className="mt-4">
              <div>
                <label className="block text-white">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-[#742d70] text-white"
                />
              </div>

              <div>
                <label className="block text-white">Apellido</label>
                <input
                  type="text"
                  value={formData.apellido}
                  onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-[#742d70] text-white"
                />
              </div>

              <div>
                <label className="block text-white">Número de Teléfono</label>
                <input
                  type="text"
                  value={formData.numero_telefono}
                  onChange={(e) => setFormData({ ...formData, numero_telefono: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-[#742d70] text-white"
                />
              </div>

              <div>
                <label className="block text-white">Dirección</label>
                <input
                  type="text"
                  value={formData.direccion}
                  onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-[#742d70] text-white"
                />
              </div>

              <div>
                <label className="block text-white">Correo</label>
                <input
                  type="email"
                  value={formData.correo}
                  onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-[#742d70] text-white"
                />
              </div>

              <div>
                <label className="block text-white">Fecha de Nacimiento</label>
                <input
                  type="date"
                  value={formData.fecha_nacimiento}
                  onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-[#742d70] text-white"
                />
              </div>

              <div>
                <label className="block text-white">Imagen de Perfil</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 rounded bg-[#742d70] text-white"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-[#742d70] text-white py-2 rounded-xl hover:bg-[#d65ed0]"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} Women's Security</p>
      </div>
    </div>
  );
};

export default PerfilPage;
