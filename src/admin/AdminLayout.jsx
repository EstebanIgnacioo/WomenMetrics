// src/Admin/layout/AdminLayout.jsx
import React from 'react';
import Navbar from '../components/pages/navbar2';
import { Outlet } from 'react-router-dom'; // Importa Outlet

const AdminLayout = () => {
  console.log(Outlet)
  return (
    <div>
      <Navbar />
      <main className="p-2">
        <Outlet /> {/* Aquí se renderizan los componentes anidados */}
      </main>
    </div>
  );
};

export default AdminLayout;
