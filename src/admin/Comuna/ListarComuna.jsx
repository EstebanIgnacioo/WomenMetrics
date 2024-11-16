import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  MoonIcon,
  MapIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function ListarComuna() {
  const [comunas, setComunas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id_comuna: "", nombre: "" });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [comunaToChange, setComunaToChange] = useState(null);


  useEffect(() => {
    fetchComunas();
  }, []);

  const fetchComunas = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/ver-comunas")
      .then((response) => response.json())
      .then((data) => {
        if (data.comunas) {
          setComunas(data.comunas);
        }
      })
      .catch((error) => {
        console.error("Error al obtener las comunas:", error);
      });
  };

  const filteredComunas = comunas.filter((comuna) =>
    comuna.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredComunas.length / itemsPerPage);

  const paginatedComunas = filteredComunas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddComuna = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/agregar-comuna", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: formData.nombre }),
    })
      .then((response) => {
        if (response.ok) {
          setIsAddModalOpen(false);
          setFormData({ id_comuna: "", nombre: "" });
          fetchComunas();
        }
      })
      .catch((error) => console.error("Error al agregar comuna:", error));
  };

  const handleEditComuna = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/editar-comuna", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_comuna: formData.id_comuna, nombre: formData.nombre }),
    })
      .then((response) => {
        if (response.ok) {
          setIsEditModalOpen(false);
          setFormData({ id_comuna: "", nombre: "" });
          fetchComunas();
        }
      })
      .catch((error) => console.error("Error al editar comuna:", error));
  };


  const handleChangeComunaState = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/cambiar-estado-comuna", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_comuna: comunaToChange.id_comuna,
        estado: comunaToChange.estado, // Se envía el estado contrario
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Cerrar el modal y recargar los datos
          setIsConfirmModalOpen(false);
          setComunaToChange(null);
          fetchComunas();
        }
      })
      .catch((error) => console.error("Error al cambiar el estado de la comuna:", error));
  };


  return (
    <div>
      <div
        style={{ border: "1px solid #3b1c3a" }}
        className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6 mt-6"
      >
        <div className="text-white">
          <h2 className="text-5xl font-bold pb-2">Comunas</h2>
          <span className="block w-4/5 bg-[#834081] h-0.5"></span>
          <p className="text-m text-gray-300 mt-1">Aquí puedes gestionar las comunas.</p>
        </div>
        <MapIcon className="w-40 h-auto text-white p-4 rounded-full shadow-md" />
      </div>

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
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#742d70] text-white px-4 py-2 ml-4 rounded-xl shadow-lg hover:bg-[#b148ab]"
          >
            <PlusIcon className="h-7"/>
          </button>
        </div>


        <div className="overflow-x-auto">
          <table className="min-w-full rounded-xl bg-[#1f0a1e] shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-[#742d70] text-white text-left">
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">ID Comuna</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Nombre</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Estado</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedComunas.map((comuna) => (
                <tr key={comuna.id_comuna} className="text-white hover:bg-[#52224e9a]">
                  <td className="py-3 px-4 border-b">{comuna.id_comuna}</td>
                  <td className="py-3 px-4 border-b">{comuna.nombre}</td>
                  <td className="py-3 px-4 border-b">
                    {comuna.estado ? "Activado" : "Desactivado"}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <PencilIcon
                      className="h-auto w-5 cursor-pointer hover:text-blue-400"
                      onClick={() => {
                        setFormData({
                          id_comuna: comuna.id_comuna,
                          nombre: comuna.nombre,
                        });
                        setIsEditModalOpen(true);
                      }}
                    />
                    <MoonIcon
                      className="h-auto w-5 cursor-pointer hover:text-yellow-400"
                      onClick={() => {
                        setComunaToChange({
                          id_comuna: comuna.id_comuna,
                          estado: !comuna.estado, // Cambia el estado (de true a false o viceversa)
                        });
                        setIsConfirmModalOpen(true); // Abre el modal de confirmación
                      }}
                    />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-[#742d70] rounded disabled:opacity-50 hover:bg-[#742d70]"
          >
            Anterior
          </button>
          <span className="px-4 py-2 mx-1">Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-[#742d70] rounded disabled:opacity-50 hover:bg-[#742d70]"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal para agregar comuna */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1f0a1e] p-6 rounded-xl w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl mx-auto text-center">Agregar Comuna</h3>
              <XMarkIcon
                className="h-5 w-5 text-white cursor-pointer"
                onClick={() => setIsAddModalOpen(false)}
              />
            </div>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de la comuna"
              className="w-full px-4 py-2 mb-4 bg-transparent border rounded text-white placeholder-gray-300"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <button
              onClick={handleAddComuna}
              className="bg-[#742d70] text-white px-4 py-2 rounded w-full hover:bg-[#b849b2]"
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Modal para editar comuna */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1f0a1e] p-6 rounded-xl w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white mx-auto text-xl">Editar Comuna</h3>
              <XMarkIcon
                className="h-5 w-5 text-white cursor-pointer"
                onClick={() => setIsEditModalOpen(false)}
              />
            </div>
            <input
              type="text"
              name="id_comuna"
              value={formData.id_comuna}
              className="w-full px-4 py-2 mb-4 bg-transparent border rounded text-white placeholder-gray-300"
              readOnly
            />
            <input
              type="text"
              name="nombre"
              placeholder="Nombre de la comuna"
              className="w-full px-4 py-2 mb-4 bg-transparent border rounded text-white placeholder-gray-300"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <button
              onClick={handleEditComuna}
              className="bg-[#742d70] text-white px-4 py-2 rounded w-full hover:bg-[#bd4cb7]"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      )}





      {isConfirmModalOpen && comunaToChange && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#1f0a1e] p-6 rounded-xl w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white mx-auto text-xl">Confirmar cambio de estado</h3>
              <XMarkIcon
                className="h-5 w-5 text-white cursor-pointer"
                onClick={() => setIsConfirmModalOpen(false)}
              />
            </div>
            <p className="text-white mb-6">
              ¿Estás seguro de que deseas cambiar el estado de la comuna {comunaToChange.id_comuna}?
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleChangeComunaState}
                className="bg-[#742d70] text-white px-4 py-2 rounded hover:bg-[#b849b2]"
              >
                Confirmar
              </button>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ListarComuna;
