"use client";

import React from 'react';
import PieChart from '../../components/pages/PieChart';
import CardsAlertas from '../../components/pages/CardsAlertas';
import ChartDepartamento from '../../components/pages/ChartDepartamento';
import PieAlertasMes from '../../components/pages/PieAlertasMes';
import TableUsuariosComuna from '../../components/pages/TableUsuariosComuna';

import '../../styles/App.css'; // Asegúrate de tener este archivo CSS

function Dashboards() {
  return (
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
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center p-5 rounded-lg shadow-lg bg-transparent">
          <CardsAlertas />
        </div>

        {/* TableUsuariosComuna en una fila por debajo */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center p-5 rounded-lg shadow-lg bg-transparent">
          <TableUsuariosComuna />
        </div>
        
      </div>
    </div>
  );
}

export default Dashboards;
