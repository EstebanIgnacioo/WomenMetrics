"use client";

import React from 'react';
import PieChart from '../../components/pages/PieChart';
import CardsAlertas from '../../components/pages/CardsAlertas';
import ChartDepartamento from '../../components/pages/ChartDepartamento';
import PieAlertasMes from '../../components/pages/PieAlertasMes';
import TableUsuariosComuna from '../../components/pages/TableUsuariosComuna';
import { ChartBarIcon } from '@heroicons/react/24/outline';

import '../../styles/App.css'; // Asegúrate de tener este archivo CSS

function Dashboards() {
  return (
    <div>
    <div 
    style={{  border: "1px solid #3b1c3a" }}
    className="mx-auto w-[77%] bg-[#1f0a1e] p-10 rounded-xl flex items-center justify-between mb-6">
      <div className="text-white">
        <h2 className="text-5xl font-bold pb-2">Dashboard</h2>
        <span className="block w-4/5 bg-[#834081] h-0.5"></span>

        <p className="text-m text-gray-300 mt-1">
          Vista general de métricas y reportes importantes.
        </p>
      </div>
      <ChartBarIcon className="w-40 h-auto text-white p-4  rounded-full shadow-md" />
    </div>



    <div className="app-container flex justify-center">
      {/* Contenedor principal con Tailwind Flexbox y Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl w-full">
        
        {/* Contenedor de PieChart */}

          <PieChart />
        

        {/* Contenedor de PieAlertasMes */}

          <PieAlertasMes />


        {/* Contenedor de ChartDepartamento */}

          <ChartDepartamento />


        {/* CardsAlertas en una fila por debajo */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center p-5 rounded-lg ">
          <CardsAlertas />
        </div>

        {/* TableUsuariosComuna en una fila por debajo */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center p-5 rounded-lg ">
          <TableUsuariosComuna />
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default Dashboards;
