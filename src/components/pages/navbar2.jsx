import React, { useState } from 'react';
import '../../styles/navbar2.css'; // Asegúrate de tener este archivo CSS
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importa useAuth
import { useNavigate } from "react-router-dom"; // Importa useNavigate

function Navbar() {
  const [collapsed, setCollapsed] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useAuth(); // Desestructura logout del contexto


  const handleLogout = () => {
    logout();
    console.log("Sesión cerrada correctamente"); // Log para confirmar el cierre de sesión
    alert("Sesión cerrada correctamente");
  };


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  return (
    <nav
      className={`navbar ${collapsed ? 'collapsed' : ''}`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <h2 className='text-center'>Women Metrics</h2>
      <ul>

       
        <li>
          <Link to="/admin/Dashboard"> {/* Enlace a Dashboard */}
            <ion-icon name="analytics"></ion-icon>
            <span className="text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/Chatbot"> {/* Enlace a ChatBot */}
            <ion-icon name="chatbubbles"></ion-icon>
            <span className="text">ChatBot</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/Alertas"> 
            <ion-icon name="notifications"></ion-icon>
            <span className="text">Alertas</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/Perfil"> 
            <ion-icon name="person"></ion-icon>
            <span className="text">Perfil</span>
          </Link>
        </li>

        <span className="block w-4/5 bg-[#834081] h-0.5"></span>

         <li>
          <Link to="/admin/Comuna"> {/* Enlace a ChatBot */}
            <ion-icon name="map"></ion-icon>
            <span className="text">Comunas</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/Departamento">
            <ion-icon name="business"></ion-icon>
            <span className="text">Departamentos</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/Genero"> 
            <ion-icon name="transgender"></ion-icon>
            <span className="text">Generos</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/Gravedad"> 
            <ion-icon name="pulse"></ion-icon>
            <span className="text">Gravedades</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/Municipalidad"> 
            <ion-icon name="contacts"></ion-icon>
            <span className="text">Municipalidades</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/Personas"> 
            <ion-icon name="people"></ion-icon>
            <span className="text">Perfiles</span>
          </Link>
        </li>


       
        <span className="block w-4/5 bg-[#834081] h-0.5"></span>

        <li>
          <Link
            onClick={handleLogout}>
            <ion-icon name="log-out"></ion-icon>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
      <li>
        <ion-icon name="help"></ion-icon>
        <span className="text">About us</span>
      </li>
    </nav>
  );
}

export default Navbar;
