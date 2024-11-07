import React, { useState } from 'react';
import '../../styles/navbar2.css'; // Asegúrate de tener este archivo CSS
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importa useAuth
import { useNavigate } from "react-router-dom"; // Importa useNavigate

function Navbar() {
  const [collapsed, setCollapsed] = useState(true);

  const { logout } = useAuth(); // Desestructura logout del contexto


  const handleLogout = () => {
    logout();
    console.log("Sesión cerrada correctamente"); // Log para confirmar el cierre de sesión
    alert("Sesión cerrada correctamente");
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
          <Link to="/admin/Chatbot"> {/* Enlace a ChatBot */}
            <ion-icon name="chatbubbles"></ion-icon>
            <span className="text">ChatBot</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/Dashboard"> {/* Enlace a Dashboard */}
            <ion-icon name="analytics"></ion-icon>
            <span className="text">Dashboard</span>
          </Link>
        </li>
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
