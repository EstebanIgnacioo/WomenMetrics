import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PencilIcon, PlusIcon, MoonIcon, BuildingOffice2Icon, XMarkIcon } from '@heroicons/react/24/outline';

function ListarDepartamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Para almacenar el término de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [modalOpen, setModalOpen] = useState(false); // Para abrir/cerrar el modal de agregar/editar
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // Modal de confirmación para cambiar estado
  const [formData, setFormData] = useState({
    id_departamento: "",
    nombre_departamento: "",
    numero_telefono: ""
  }); // Datos del formulario
  const [totalPages, setTotalPages] = useState(1); // Número total de páginas
  const itemsPerPage = 8; // Máximo de elementos por página
  const [estadoDepto, setEstadoDepto] = useState(null); // Estado del departamento para confirmación

  useEffect(() => {
    // Llamada a la API para obtener los departamentos
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/ver-departamentos")
      .then((response) => response.json())
      .then((data) => {
        // Verifica si el response contiene los departamentos
        if (data.departamentos) {
          setDepartamentos(data.departamentos);
          setTotalPages(Math.ceil(data.departamentos.length / itemsPerPage));
        }
      })
      .catch((error) => {
        console.error("Error al obtener los departamentos:", error);
      });
  }, []);

  // Filtrar departamentos por el término de búsqueda
  const filteredDepartamentos = departamentos.filter((departamento) =>
    departamento.nombre_departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener los departamentos para la página actual
  const paginatedDepartamentos = filteredDepartamentos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Manejo de la apertura y cierre del modal
  const openModal = (departamento = null) => {
    if (departamento) {
      setFormData({
        id_departamento: departamento.id_departamento,
        nombre_departamento: departamento.nombre_departamento,
        numero_telefono: departamento.numero_telefono || ""
      });
    } else {
      setFormData({
        id_departamento: "",
        nombre_departamento: "",
        numero_telefono: ""
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setConfirmModalOpen(false);
  };

  // Función para agregar un departamento
  const handleAddDepartamento = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/agregar-departamento", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_departamento: formData.nombre_departamento
      })
    })
      .then(response => response.json())
      .then(() => {
        alert("Departamento agregado");
        closeModal();
        fetchDepartamentos();
      })
      .catch(error => console.error("Error al agregar departamento:", error));
  };

  // Función para editar un departamento
  const handleEditDepartamento = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/editar-departamento", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_departamento: formData.id_departamento,
        nombre_departamento: formData.nombre_departamento,
        numero_telefono: formData.numero_telefono,
      })
    })
      .then(response => response.json())
      .then(() => {
        alert("Departamento actualizado");
        closeModal();
        fetchDepartamentos();
      })
      .catch(error => console.error("Error al editar departamento:", error));
  };

  // Función para abrir el modal de confirmación de estado
  const openConfirmModal = (departamento) => {
    setEstadoDepto(departamento);
    setConfirmModalOpen(true);
  };

  // Función para cambiar el estado de un departamento
  const handleChangeEstado = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/cambiar-estado-departamento", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_departamento: estadoDepto.id_departamento,
        estado: !estadoDepto.estado,
      })
    })
      .then(response => response.json())
      .then(() => {
        alert("Estado actualizado");
        closeModal();
        fetchDepartamentos();
      })
      .catch(error => console.error("Error al cambiar estado:", error));
  };

  // Función para obtener los departamentos
  const fetchDepartamentos = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/ver-departamentos")
      .then((response) => response.json())
      .then((data) => {
        if (data.departamentos) {
          setDepartamentos(data.departamentos);
          setTotalPages(Math.ceil(data.departamentos.length / itemsPerPage));
        }
      })
      .catch((error) => console.error("Error al obtener los departamentos:", error));
  };

  return (
    <div>
      <div
        style={{ border: "1px solid #3b1c3a" }}
        className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6 mt-6">
        <div className="text-white">
          <h2 className="text-5xl font-bold pb-2">Departamentos</h2>
          <span className="block w-4/5 bg-[#834081] h-0.5"></span>
          <p className="text-m text-gray-300 mt-1">Aquí puedes gestionar los departamentos.</p>
        </div>
        <BuildingOffice2Icon className="w-40 h-auto text-white p-4 rounded-full shadow-md" />
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
            onClick={() => openModal()}
            className="bg-[#742d70] text-white px-4 py-2 ml-4 rounded-xl shadow-lg hover:bg-[#b148ab]"
          >
            <PlusIcon className="h-7" />
          </button>
        </div>

        {/* Tabla de departamentos */}
        <div className="overflow-x-auto">
          <table
            style={{ border: "2px solid #3b1c3a" }}
            className="min-w-full rounded-xl bg-[#1f0a1e] shadow-lg overflow-hidden"
          >
            <thead>
              <tr className="bg-[#742d70] text-white text-left">
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">ID Departamento</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Nombre</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Estado</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDepartamentos.map((departamento) => (
                <tr key={departamento.id_departamento} className="text-white hover:bg-[#52224e9a]">
                  <td className="py-3 px-4 border-b">{departamento.id_departamento}</td>
                  <td className="py-3 px-4 border-b">{departamento.nombre_departamento}</td>
                  <td className="py-3 px-4 border-b">
                    {departamento.estado ? "Activado" : "Desactivado"}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <PencilIcon
                      className="h-auto w-5 cursor-pointer hover:text-blue-400"
                      onClick={() => openModal(departamento)}
                    />
                    <MoonIcon
                      onClick={() => openConfirmModal(departamento)}
                      className="h-auto w-5 cursor-pointer hover:text-yellow-400"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
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
      </div>

      {/* Modal para agregar y editar departamento */}
      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1f0a1e] p-6 rounded-xl w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl text-center mx-auto font-bold">
                {formData.id_departamento ? "Editar Departamento" : "Agregar Departamento"}
              </h2>
              {/* Botón de cierre con X */}
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nombre del Departamento"
                value={formData.nombre_departamento}
                onChange={(e) =>
                  setFormData({ ...formData, nombre_departamento: e.target.value })
                }
                className="w-full px-4 py-2 mb-4 bg-transparent border rounded text-white placeholder-gray-300"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Número de Teléfono"
                value={formData.numero_telefono}
                onChange={(e) =>
                  setFormData({ ...formData, numero_telefono: e.target.value })
                }
                className="w-full px-4 py-2 mb-4 bg-transparent border rounded text-white placeholder-gray-300"
              />
            </div>
            <div className="flex justify-center">
              <button
                onClick={formData.id_departamento ? handleEditDepartamento : handleAddDepartamento}
                className=" w-full bg-[#742d70] text-white py-2 rounded hover:bg-[#b148ab]"
              >
                {formData.id_departamento ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Modal de confirmación */}
      {confirmModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1f0a1e] rounded-xl p-6">
            <h2 className="text-white text-lg font-bold mb-4">
              ¿Seguro que deseas cambiar el estado del departamento?
            </h2>
            <div className="flex justify-between">
            <button
                onClick={handleChangeEstado}
                className="bg-[#742d70] text-white px-4 py-2 rounded hover:bg-[#b849b2]"
              >
                Confirmar
              </button>
              <button
                onClick={closeModal}
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

export default ListarDepartamentos;
