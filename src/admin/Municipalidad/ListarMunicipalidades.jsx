import React, { useEffect, useState } from "react";
import { 
  MagnifyingGlassIcon, 
  PencilIcon, 
  PlusIcon, 
  MoonIcon, 
  XMarkIcon, 
  UsersIcon 
} from "@heroicons/react/24/outline";

function ListarMunicipalidades() {
  const [municipalidades, setMunicipalidades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null); // Datos para el modal
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/ver-municipalidades")
      .then((response) => response.json())
      .then((data) => {
        if (data.municipalidades) {
          setMunicipalidades(data.municipalidades);
        }
      })
      .catch((error) => console.error("Error al obtener las municipalidades:", error));
  }, []);

  const handleAddMunicipalidad = () => {
    setModalData(null);
    setShowModal(true);
  };

  const handleEditMunicipalidad = (municipalidad) => {
    setModalData(municipalidad);
    setShowModal(true);
  };

  const handleChangeState = (id_municipalidad, estado) => {
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/cambiar-estado-municipalidad", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_municipalidad, estado: !estado }),
    })
      .then(() => {
        setMunicipalidades((prev) =>
          prev.map((item) =>
            item.id_municipalidad === id_municipalidad
              ? { ...item, estado: !estado }
              : item
          )
        );
      })
      .catch((error) => console.error("Error al cambiar estado:", error));
  };

  const handleSaveMunicipalidad = (data) => {
    const url = modalData
      ? "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/editar-municipalidad"
      : "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/agregar-municipalidad";
    const method = modalData ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((newData) => {
        if (modalData) {
          setMunicipalidades((prev) =>
            prev.map((item) =>
              item.id_municipalidad === modalData.id_municipalidad
                ? { ...item, ...data }
                : item
            )
          );
        } else {
          setMunicipalidades((prev) => [...prev, newData]);
        }
        setShowModal(false);
      })
      .catch((error) => console.error("Error al guardar municipalidad:", error));
  };

  const filteredMunicipalidades = municipalidades.filter((municipalidad) =>
    municipalidad.nombre_municipalidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMunicipalidades.length / itemsPerPage);

  const paginatedMunicipalidades = filteredMunicipalidades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6 mt-6">
        <div className="text-white">
          <h2 className="text-5xl font-bold pb-2">Municipalidades</h2>
          <span className="block w-4/5 bg-[#834081] h-0.5"></span>
          <p className="text-m text-gray-300 mt-1">
            Aquí puedes gestionar las municipalidades.
          </p>
        </div>
        <UsersIcon className="w-40 h-auto text-white p-4 rounded-full shadow-md" />
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
            className="bg-[#742d70] text-white px-4 py-2 ml-4 rounded-xl shadow-lg hover:bg-[#b148ab]"
            onClick={handleAddMunicipalidad}
          >
            <PlusIcon className="h-7" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full rounded-xl bg-[#1f0a1e] shadow-lg overflow-hidden">
            <thead>
              <tr className="bg-[#742d70] text-white text-left">
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">ID</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Nombre</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Dirección</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Estado</th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMunicipalidades.map((municipalidad) => (
                <tr key={municipalidad.id_municipalidad} className="text-white hover:bg-[#52224e9a]">
                  <td className="py-3 px-4 border-b">{municipalidad.id_municipalidad}</td>
                  <td className="py-3 px-4 border-b">{municipalidad.nombre_municipalidad}</td>
                  <td className="py-3 px-4 border-b">{municipalidad.direccion_municipalidad}</td>
                  <td className="py-3 px-4 border-b">
                    {municipalidad.estado ? "Activado" : "Desactivado"}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <PencilIcon
                      className="h-auto w-5 cursor-pointer hover:text-blue-400"
                      onClick={() => handleEditMunicipalidad(municipalidad)}
                    />
                    <MoonIcon
                      className="h-auto w-5 cursor-pointer hover:text-yellow-400"
                      onClick={() => handleChangeState(municipalidad.id_municipalidad, municipalidad.estado)}
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

      {showModal && (
        <Modal
          modalData={modalData}
          closeModal={() => setShowModal(false)}
          saveMunicipalidad={handleSaveMunicipalidad}
        />
      )}
    </div>
  );
}

function Modal({ modalData, closeModal, saveMunicipalidad }) {
  const [formData, setFormData] = useState(
    modalData || {
      nombre_municipalidad: "",
      direccion_municipalidad: "",
      id_comuna: "",
    }
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMunicipalidad(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#1f0a1e] p-6 relative rounded shadow-lg w-1/3">
      <XMarkIcon
          className="h-6 w-6 text-white cursor-pointer absolute top-4 right-4"
          onClick={closeModal}
        />
        <h2 className="text-lg font-bold mb-4">
          {modalData ? "Editar Municipalidad" : "Agregar Municipalidad"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre_municipalidad" className="block text-sm font-medium mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="nombre_municipalidad"
              name="nombre_municipalidad"
              value={formData.nombre_municipalidad}
              onChange={handleChange}
              className="w-full p-2 text-black border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="direccion_municipalidad" className="block text-sm font-medium mb-2">
              Dirección
            </label>
            <input
              type="text"
              id="direccion_municipalidad"
              name="direccion_municipalidad"
              value={formData.direccion_municipalidad}
              onChange={handleChange}
              className="w-full p-2 text-black border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id_comuna" className="block text-sm font-medium mb-2">
              ID Comuna
            </label>
            <input
              type="text"
              id="id_comuna"
              name="id_comuna"
              value={formData.id_comuna}
              onChange={handleChange}
              className="w-full text-black p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="mt-6 w-full bg-[#742d70] text-white py-2 rounded hover:bg-[#b148ab]">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ListarMunicipalidades;
