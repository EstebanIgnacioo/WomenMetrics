import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  MoonIcon,
  BellIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "@/contexts/AuthContext";

function ListarAlertas() {
  const [alertasDerivadas, setAlertasDerivadas] = useState([]);
  const [alertasNoDerivadas, setAlertasNoDerivadas] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlerta, setSelectedAlerta] = useState(null);
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const itemsPerPage = 8;

  const { user } = useAuth();

  useEffect(() => {
    fetchAlertas();
    fetchDepartamentos();
  }, []);

  const fetchAlertas = () => {
    fetch(
      "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/listar-alertas-hoy"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.alertasDerivadas || data.alertasNoDerivadas) {
          setAlertasDerivadas(data.alertasDerivadas || []);
          setAlertasNoDerivadas(data.alertasNoDerivadas || []);
        }
      })
      .catch((error) => {
        console.error("Error fetching alertas:", error);
      });
  };

  const fetchDepartamentos = () => {
    fetch(
      "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/listar-departamentos"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.departamentos) {
          setDepartamentos(data.departamentos);
        }
      })
      .catch((error) => {
        console.error("Error fetching departamentos:", error);
      });
  };

  const convertToDate = (timestamp) => {
    if (timestamp?._seconds) {
      return new Date(timestamp._seconds * 1000).toLocaleString();
    }
    return "Fecha inválida";
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAlerta(null);
    setSelectedDepartamento("");
  };

  const openModal = (alerta) => {
    setSelectedAlerta(alerta);
    setModalOpen(true);
  };

  const handleDerivar = () => {
    if (!selectedDepartamento) {
      alert("Por favor selecciona un departamento.");
      return;
    }

    const payload = {
      id_alerta: selectedAlerta.id_alerta,
      id_departamento: selectedDepartamento,
      id_funcionario: user?.persona?.id_persona,
    };

    fetch(
      "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/derivar-alerta",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        alert("Alerta derivada exitosamente.");
        fetchAlertas();
        closeModal();
      })
      .catch((error) => {
        console.error("Error derivando alerta:", error);
        alert("Ocurrió un error al derivar la alerta.");
      });
  };

  const filteredAlertas = [...alertasDerivadas, ...alertasNoDerivadas].filter(
    (alerta) =>
      alerta.comuna.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAlertas.length / itemsPerPage);
  const paginatedAlertas = filteredAlertas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{ border: "1px solid #3b1c3a" }}
        className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6 mt-6"
      >
        <div className="text-white">
          <h2 className="text-5xl font-bold pb-2">Alertas del Día</h2>
          <span className="block w-4/5 bg-[#834081] h-0.5"></span>
          <p className="text-m text-gray-300 mt-1">
            Aquí puedes gestionar las alertas reportadas el día de hoy.
          </p>
        </div>
        <BellIcon className="w-40 h-auto text-white p-4 rounded-full shadow-md" />
      </div>

      {/* Búsqueda */}
      <div className="container mx-auto mt-5">
        <div className="flex items-center mb-4 w-full max-w-md mx-start">
          <div className="flex items-center bg-[#742d70] p-3 rounded-xl">
            <MagnifyingGlassIcon className="h-5 w-5 text-white mr-3" />
            <input
              type="text"
              placeholder="Buscar por comuna"
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
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">
                  Comuna
                </th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">
                  Dirección
                </th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">
                  Mensaje
                </th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">
                  Fecha
                </th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">
                  Derivada
                </th>
                <th className="py-3 px-4 border-b-2 font-semibold text-sm">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedAlertas.map((alerta) => (
                <tr
                  key={alerta.id_alerta}
                  className="text-white hover:bg-[#52224e9a]"
                >
                  <td className="py-3 px-4 border-b">{alerta.comuna}</td>
                  <td className="py-3 px-4 border-b">{alerta.direccion}</td>
                  <td className="py-3 px-4 border-b">{alerta.mensaje}</td>
                  <td className="py-3 px-4 border-b">
                    {convertToDate(alerta.fecha)}
                  </td>
                  <td className="py-3 px-4 border-b">
                    {alertasDerivadas.includes(alerta) ? "Sí" : "No"}
                  </td>
                  <td className="py-3 px-4 border-b flex space-x-2">
                    <ArrowRightOnRectangleIcon
                      className="h-auto w-5 cursor-pointer hover:text-green-400"
                      onClick={() => openModal(alerta)}
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
      {modalOpen && selectedAlerta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#1f0a1e] p-6 rounded-xl w-96 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-xl font-bold">Derivar Alerta</h2>
              <XMarkIcon
                className="h-6 w-6 text-white cursor-pointer"
                onClick={closeModal}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="departamento"
                className="block text-white font-medium mb-2"
              >
                Selecciona un Departamento:
              </label>
              <select
                id="departamento"
                value={selectedDepartamento}
                onChange={(e) => setSelectedDepartamento(e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#742d70] text-white outline-none"
              >
                <option value="" disabled>
                  Selecciona un departamento
                </option>
                {departamentos.map((dep) => (
                  <option key={dep.id_departamento} value={dep.id_departamento}>
                    {dep.nombre_departamento}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleDerivar}
              className="mt-6 w-full bg-[#742d70] text-white py-2 rounded-lg hover:bg-[#c44ebe]"
            >
              Derivar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListarAlertas;
