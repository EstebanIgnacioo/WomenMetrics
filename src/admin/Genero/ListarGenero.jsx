import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  MoonIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function ListarGeneros() {
  const [generos, setGeneros] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id_genero: null, descripcion: "" });
  const itemsPerPage = 8;

  // Fetch inicial
  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/ver-generos")
      .then((response) => response.json())
      .then((data) => {
        if (data.generos) {
          setGeneros(data.generos);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los géneros:", error);
      });
  };

  // Agregar género
  const handleAddGenero = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/agregar-genero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: formData.descripcion }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchGeneros();
        closeModal();
      })
      .catch((error) => console.error("Error al agregar género:", error));
  };

  // Editar género
  const handleEditGenero = () => {
    fetch(
      `https://api-women-security-app-544496114867.southamerica-west1.run.app/api/editar-genero/${formData.id_genero}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descripcion: formData.descripcion }),
      }
    )
      .then((response) => response.json())
      .then(() => {
        fetchGeneros();
        closeModal();
      })
      .catch((error) => console.error("Error al editar género:", error));
  };

  // Cambiar estado
  const handleToggleEstado = (id, estado) => {
    fetch(
      `https://api-women-security-app-544496114867.southamerica-west1.run.app/api/cambiar-estado-genero/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: !estado }),
      }
    )
      .then((response) => response.json())
      .then(() => fetchGeneros())
      .catch((error) => console.error("Error al cambiar estado del género:", error));
  };

  // Filtrar y paginar
  const filteredGeneros = generos.filter((genero) =>
    genero.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredGeneros.length / itemsPerPage);
  const paginatedGeneros = filteredGeneros.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ id_genero: null, descripcion: "" });
  };

  const openModal = (genero = { id_genero: null, descripcion: "" }) => {
    setFormData(genero);
    setModalOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{ border: "1px solid #3b1c3a" }}
        className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6 mt-6"
      >
        <div className="text-white">
          <h2 className="text-5xl font-bold pb-2">Géneros</h2>
          <span className="block w-4/5 bg-[#834081] h-0.5"></span>
          <p className="text-m text-gray-300 mt-1">Aquí puedes gestionar los géneros.</p>
        </div>
        <UserIcon className="w-40 h-auto text-white p-4  rounded-full shadow-md" />
      </div>

      {/* Búsqueda y Agregar */}
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

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table
            style={{ border: "2px solid #3b1c3a" }}
            className="min-w-full rounded-xl bg-[#1f0a1e] shadow-lg overflow-hidden"
          >
            <thead>
              <tr className="bg-[#742d70] text-white text-left">
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">ID Género</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Nombre</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Estado</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedGeneros.map((genero) => (
                <tr key={genero.id_genero} className="text-white hover:bg-[#52224e9a]">
                  <td className="py-3 px-4 border-b">{genero.id_genero}</td>
                  <td className="py-3 px-4 border-b">{genero.descripcion}</td>
                  <td className="py-3 px-4 border-b">
                    {genero.estado ? "Activado" : "Desactivado"}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <PencilIcon
                      className="h-auto w-5 cursor-pointer hover:text-blue-400"
                      onClick={() => openModal(genero)}
                    />
                    <MoonIcon
                      className="h-auto w-5 cursor-pointer hover:text-yellow-400"
                      onClick={() => handleToggleEstado(genero.id_genero, genero.estado)}
                    />
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1f0a1e] p-6 rounded-xl w-96 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">
                {formData.id_genero ? "Editar Género" : "Agregar Género"}
              </h2>
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="descripcion" className="block text-white font-medium mb-2">
                Nombre
              </label>
              <input
                id="descripcion"
                type="text"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-4 py-2 rounded bg-[#742d70] text-white outline-none"
              />
            </div>
            <button
              onClick={formData.id_genero ? handleEditGenero : handleAddGenero}
              className="mt-6 w-full bg-[#742d70] text-white py-2 rounded-lg hover:bg-[#b148ab]"
            >
              {formData.id_genero ? "Guardar cambios" : "Agregar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarGeneros;
