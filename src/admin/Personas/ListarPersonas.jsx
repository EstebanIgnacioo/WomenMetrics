import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  MoonIcon,
  SunIcon, // Icono del sol
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function ListarPersonas() {
  const [personas, setPersonas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalConfirmOpen, setModalConfirmOpen] = useState(false);
  const [modalActivateConfirmOpen, setModalActivateConfirmOpen] = useState(false); // Modal de confirmación para activar
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [formData, setFormData] = useState({
    nombre_usuario: "",
    password: "",
    imagen_usuario: "",
    tipo_usuario: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = () => {
    fetch(
      "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/listar-personas-perfil"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.personas) {
          setPersonas(data.personas);
        }
      })
      .catch((error) => {
        console.error("Error fetching personas:", error);
      });
  };

  const handleDeactivate = () => {
    fetch(
      "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/desactivar-perfil",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_persona: selectedPersona.id_persona }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        fetchPersonas();
        closeModal();
        alert("Perfil desactivado exitosamente.");
      })
      .catch((error) => {
        console.error("Error desactivando perfil:", error);
        alert("Ocurrió un error al desactivar el perfil.");
      });
  };

  const handleActivate = () => {
    fetch(
      "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/activar-perfil",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_persona: selectedPersona.id_persona }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        fetchPersonas();
        setModalActivateConfirmOpen(false); // Cierra el modal de confirmación
        alert("Perfil activado exitosamente.");
      })
      .catch((error) => {
        console.error("Error activando perfil:", error);
        alert("Ocurrió un error al activar el perfil.");
      });
  };

  const handleEdit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const formDataToSend = new FormData();

      // Asegúrate de que los campos de datos estén correctamente asignados
      formDataToSend.append("id_persona", selectedPersona.id_persona);
      if (formData.nombre_usuario) formDataToSend.append("nombre_usuario", formData.nombre_usuario);
      if (formData.password) formDataToSend.append("password", formData.password);

      // Si hay una imagen seleccionada, agregarla al FormData
      if (imageFile) {
        formDataToSend.append("imagen_usuario", imageFile);
      }

      console.log("Datos enviados:", formDataToSend); // Esto mostrará un objeto FormData

      // Realizar la solicitud a la API para editar el perfil
      const response = await fetch(
        "https://cr1xpzvm-3000.brs.devtunnels.ms/api/editar-perfil",
        {
          method: "PUT",
          body: formDataToSend, // Enviar el objeto FormData directamente
        }
      );

      if (response.ok) {
        console.log("Perfil actualizado exitosamente.");
        fetchPersonas(); // Actualizar lista de personas
        closeModal(); // Cerrar el modal
        alert("Perfil actualizado exitosamente.");
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar perfil:", errorData);
        throw new Error("Error al actualizar el perfil.");
      }
    } catch (error) {
      console.error("Error editando perfil:", error);
      alert("Ocurrió un error al actualizar el perfil.");
    }
  };

  const openEditModal = (persona) => {
    setSelectedPersona(persona);
    setFormData({
      nombre_usuario: persona.perfil?.nombre_usuario || "",
      password: "",
      imagen_usuario: persona.perfil?.imagen_usuario || "",
      tipo_usuario: persona.perfil?.tipo_usuario || "",
    });
    setImageFile(null);
    setModalEditOpen(true);
  };

  const openConfirmModal = (persona) => {
    setSelectedPersona(persona);
    setModalConfirmOpen(true);
  };

  const openActivateConfirmModal = (persona) => {
    setSelectedPersona(persona);
    setModalActivateConfirmOpen(true); // Abre el modal de confirmación de activación
  };

  const closeModal = () => {
    setModalEditOpen(false);
    setModalConfirmOpen(false);
    setModalActivateConfirmOpen(false); // Cierra el modal de confirmación de activación
    setSelectedPersona(null);
    setFormData({
      nombre_usuario: "",
      password: "",
      imagen_usuario: "",
      tipo_usuario: "",
    });
    setImageFile(null);
  };

  const filteredPersonas = personas.filter((persona) =>
    persona.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPersonas.length / itemsPerPage);
  const paginatedPersonas = filteredPersonas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Header */}
      <div
        style={{ border: "1px solid #3b1c3a" }}
        className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6 mt-6"
      >
        <div className="text-white">
          <h2 className="text-5xl font-bold pb-2">Personas</h2>
          <span className="block w-4/5 bg-[#834081] h-0.5"></span>
          <p className="text-m text-gray-300 mt-1">
            Aquí puedes gestionar las personas y sus perfiles.
          </p>
        </div>
        <UserGroupIcon className="w-40 h-auto text-white p-4 rounded-full shadow-md" />
      </div>

      {/* Búsqueda */}
      <div className="container mx-auto mt-5">
        <div className="flex items-center mb-4 w-full max-w-md mx-start">
          <div className="flex items-center bg-[#742d70] p-3 rounded-xl">
            <MagnifyingGlassIcon className="h-5 w-5 text-white mr-3" />
            <input
              type="text"
              placeholder="Buscar por nombre"
              className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table
            style={{ border: "2px solid #3b1c3a" }}
            className="min-w-full rounded-xl bg-[#1f0a1e] shadow-lg overflow-hidden"
          >
            <thead>
              <tr className="bg-[#742d70] text-white text-left">
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Nombre</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Apellido</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Correo</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Estado</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedPersonas.map((persona) => (
                <tr key={persona.id_persona} className="text-white hover:bg-[#52224e9a]">
                  <td className="py-3 px-4 border-b">{persona.nombre}</td>
                  <td className="py-3 px-4 border-b">{persona.apellido}</td>
                  <td className="py-3 px-4 border-b">{persona.correo}</td>
                  <td className="py-3 px-4 border-b">
                    {persona.perfil?.estado ? "Activo" : "Inactivo"}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <PencilIcon
                      className="h-auto w-5 cursor-pointer hover:text-blue-400"
                      onClick={() => openEditModal(persona)}
                    />
                    {/* Mostrar el icono de la luna si el perfil está activo */}
                    {persona.perfil?.estado ? (
                      <MoonIcon
                        className="h-auto w-5 cursor-pointer hover:text-yellow-400"
                        onClick={() => openConfirmModal(persona)}
                      />
                    ) : (
                      // Mostrar el icono del sol si el perfil está inactivo
                      <SunIcon
                        className="h-auto w-5 cursor-pointer hover:text-orange-400"
                        onClick={() => openActivateConfirmModal(persona)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-[#742d70] rounded disabled:opacity-50 hover:bg-[#742d70]"
          >
            Anterior
          </button>
          <span className="px-4 py-2 mx-1">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-[#742d70] rounded disabled:opacity-50 hover:bg-[#742d70]"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal de confirmación para desactivar */}
      {modalConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1f0a1e] p-6 rounded-xl w-96 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">Confirmar Desactivación</h2>
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <p className="text-white mt-4">
              ¿Estás seguro de que deseas desactivar el perfil de{" "}
              <strong>{selectedPersona?.nombre}</strong>?
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleDeactivate}
                className="bg-[#742d70] mx-auto text-white py-2 px-4 rounded-xl hover:bg-[#ce5cc8]"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para activar */}
      {modalActivateConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1f0a1e] p-6 rounded-xl w-96 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">Confirmar Activación</h2>
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <p className="text-white mt-4">
              ¿Estás seguro de que deseas activar el perfil de{" "}
              <strong>{selectedPersona?.nombre}</strong>?
            </p>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleActivate}
                className="bg-[#742d70] mx-auto text-white py-2 px-4 rounded-xl hover:bg-[#ce5cc8]"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar perfil */}
      {modalEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1f0a1e] p-6 rounded-xl shadow-lg w-[30%]">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">Editar Perfil</h2>
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <form onSubmit={handleEdit} className="mt-4">
              <div>
                <label className="block text-white">Nombre de usuario</label>
                <input
                  type="text"
                  value={formData.nombre_usuario}
                  onChange={(e) => setFormData({ ...formData, nombre_usuario: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-[#742d70] text-white"
                />
              </div>
              <div>
                <label className="block text-white">Contraseña</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 rounded bg-[#742d70] text-white"
                />
              </div>
              <div>
                <label className="block text-white">Imagen de perfil</label>
                <input
                  type="file"
                  onChange={(e) => setImageFile(e.target.files[0])}
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
    </div>
  );
}

export default ListarPersonas;
