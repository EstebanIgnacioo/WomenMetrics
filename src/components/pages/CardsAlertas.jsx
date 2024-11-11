import React, { useEffect, useState } from "react";

// Componente Card para mostrar la información estilizada
function Card({ title, value }) {
  return (
    <div className="bg-pink-100 p-4 rounded-xl shadow-lg flex flex-col items-center justify-center w-52 h-28">
      <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">{title}</h3>
      <p className="text-3xl font-bold text-black">{value}</p>
    </div>
  );
}

// Componente principal
function AlertasDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Hacemos la solicitud a la API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/alertas-derivadas"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, []);

  // Calculamos el porcentaje de alertas derivadas
  const calcularPorcentaje = (total_alertas, total_alertas_derivadas) => {
    if (total_alertas === 0) return 0;
    return ((total_alertas_derivadas / total_alertas) * 100).toFixed(2);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const porcentajeDerivadas = calcularPorcentaje(
    data.total_alertas,
    data.total_alertas_derivadas
  );

  return (
    <div className="bg-purple-800 bg-opacity-50 backdrop-blur-md p-8 rounded-xl shadow-2xl flex justify-center items-center">
      <div className="flex space-x-6 justify-center">
        {/* Card de ALERTAS */}
        <Card title="ALERTAS" value={data.total_alertas} />
        
        {/* Card de ALERTAS DERIVADAS */}
        <Card title="ALERTAS DERIVADAS" value={data.total_alertas_derivadas} />
        
        {/* Card de ALERTAS NO DERIVADAS */}
        <Card title="ALERTAS NO DERIVADAS" value={data.total_alertas_no_derivadas} />
        
        {/* Card de Porcentaje */}
        <Card title="PORCENTAJE DERIVADAS" value={`${porcentajeDerivadas}%`} />
      </div>
    </div>
  );
}

export default AlertasDashboard;
