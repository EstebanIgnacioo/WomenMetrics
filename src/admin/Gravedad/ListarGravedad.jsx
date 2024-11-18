import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PencilIcon, PlusIcon, MoonIcon, FireIcon, XMarkIcon } from "@heroicons/react/24/outline";

function ListarGravedades() {
  const [gravedades, setGravedades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id_gravedad: "", descripcion: "", estado: true });
  const itemsPerPage = 8;

  useEffect(() => {
    fetchGravedades();
  }, []);

  const fetchGravedades = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/ver-gravedades")
      .then((response) => response.json())
      .then((data) => {
        if (data.gravedades) {
          setGravedades(data.gravedades);
        }
      })
      .catch((error) => console.error("Error al obtener las gravedades:", error));
  };

  const handleAddGravedad = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/agregar-gravedad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ descripcion: formData.descripcion }),
    })
      .then(() => {
        fetchGravedades();
        setModalOpen(false);
      })
      .catch((error) => console.error("Error al agregar gravedad:", error));
  };

  const handleEditGravedad = () => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/editar-gravedad", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_gravedad: formData.id_gravedad, descripcion: formData.descripcion }),
    })
      .then(() => {
        fetchGravedades();
        setModalOpen(false);
      })
      .catch((error) => console.error("Error al editar gravedad:", error));
  };

  const handleToggleEstado = (id_gravedad, estado) => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/cambiar-estado-gravedad", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_gravedad, estado: !estado }),
    })
      .then(() => fetchGravedades())
      .catch((error) => console.error("Error al cambiar estado:", error));
  };

  const filteredGravedades = gravedades.filter((gravedad) =>
    gravedad.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGravedades.length / itemsPerPage);

  const paginatedGravedades = filteredGravedades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (gravedad = { id_gravedad: "", descripcion: "", estado: true }) => {
    setFormData(gravedad);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div
        style={{ border: "1px solid #3b1c3a" }}
        className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6 mt-6">
        <div className="text-white">
          <h2 className="text-5xl font-bold pb-2">Gravedades</h2>
          <span className="block w-4/5 bg-[#834081] h-0.5"></span>
          <p className="text-m text-gray-300 mt-1">Aquí puedes gestionar las gravedades.</p>
        </div>
        <FireIcon className="w-40 h-auto text-white p-4 rounded-full shadow-md" />
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
            className="bg-[#742d70] text-white px-4 py-2 ml-4 rounded-xl shadow-lg hover:bg-[#b148ab]">
            <PlusIcon className="h-7" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full rounded-xl bg-[#1f0a1e] shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-[#742d70] text-white text-left">
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">ID Gravedad</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Nombre</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Estado</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedGravedades.map((gravedad) => (
                <tr key={gravedad.id_gravedad} className="text-white hover:bg-[#52224e9a]">
                  <td className="py-3 px-4 border-b">{gravedad.id_gravedad}</td>
                  <td className="py-3 px-4 border-b">{gravedad.descripcion}</td>
                  <td className="py-3 px-4 border-b">{gravedad.estado ? "Activado" : "Desactivado"}</td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <PencilIcon
                      onClick={() => openModal(gravedad)}
                      className="h-auto w-5 cursor-pointer hover:text-blue-400"
                    />
                    <MoonIcon
                      onClick={() => handleToggleEstado(gravedad.id_gravedad, gravedad.estado)}
                      className="h-auto w-5 cursor-pointer hover:text-yellow-400"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-[#742d70] rounded disabled:opacity-50 hover:bg-[#742d70]">
            Anterior
          </button>
          <span className="px-4 py-2 mx-1">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-[#742d70] rounded disabled:opacity-50 hover:bg-[#742d70]">
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#1f0a1e] p-6 rounded-lg w-96 relative">
            <XMarkIcon
              className="h-6 w-6 text-white cursor-pointer absolute top-3 right-3"
              onClick={closeModal}
            />
            <h3 className="text-xl text-white font-bold mb-4">
              {formData.id_gravedad ? "Editar Nombre" : "Agregar Nombre"}
            </h3>
            <input
              type="text"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full px-4 py-2 rounded bg-[#742d70] text-white outline-none"
            />
            <button
              onClick={formData.id_gravedad ? handleEditGravedad : handleAddGravedad}
              className="mt-6 w-full bg-[#742d70] text-white py-2 rounded hover:bg-[#b148ab]">
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarGravedades;
