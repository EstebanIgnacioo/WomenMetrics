import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PencilIcon, PlusIcon, MoonIcon, UserIcon } from '@heroicons/react/24/outline';

function ListarGeneros() {
  const [generos, setGeneros] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Para almacenar el término de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 8; // Máximo de elementos por página

  useEffect(() => {
    // Llamada a la API para obtener los géneros
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/ver-generos")
      .then((response) => response.json())
      .then((data) => {
        // Verifica si el response contiene los géneros
        if (data.generos) {
          setGeneros(data.generos);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los géneros:", error);
      });
  }, []);

  // Filtrar géneros por el término de búsqueda
  const filteredGeneros = generos.filter((genero) =>
    genero.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredGeneros.length / itemsPerPage);

  // Obtener los géneros para la página actual
  const paginatedGeneros = filteredGeneros.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Cambiar de página
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div
        style={{ border: "1px solid #3b1c3a" }}
        className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6 mt-6">
        <div className="text-white">
          <h2 className="text-5xl font-bold pb-2">Géneros</h2>
          <span className="block w-4/5 bg-[#834081] h-0.5"></span>

          <p className="text-m text-gray-300 mt-1">
            Aquí puedes gestionar los géneros.
          </p>
        </div>
        <UserIcon className="w-40 h-auto text-white p-4  rounded-full shadow-md" />
      </div>

      <div className="container mx-auto mt-5">
        {/* Campo de búsqueda con icono */}
        <div className="flex items-center bg-[#742d70] p-3 rounded-xl mb-4 w-full max-w-md mx-start shadow-md">
          <MagnifyingGlassIcon className="h-5 w-5 text-white mr-3" />
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="bg-transparent border-none outline-none text-white placeholder-gray-300 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabla de géneros */}
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
                <tr
                  key={genero.id_genero}
                  className="text-white hover:bg-[#52224e9a]"
                >
                  <td className="py-3 px-4 border-b">{genero.id_genero}</td>
                  <td className="py-3 px-4 border-b">{genero.descripcion}</td>
                  <td className="py-3 px-4 border-b">
                    {genero.estado ? "Activado" : "Desactivado"}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <PencilIcon className="h-auto w-5 cursor-pointer hover:text-blue-400" />
                    <PlusIcon className="h-auto w-5 cursor-pointer hover:text-green-400" />
                    <MoonIcon className="h-auto w-5 cursor-pointer hover:text-yellow-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Controles de paginación */}
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
    </div>
  );
}

export default ListarGeneros;
