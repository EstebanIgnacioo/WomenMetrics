import React, { useState } from 'react';
import '../../styles/navbar2.css'; // Asegúrate de tener este archivo CSS
import { Link } from 'react-router-dom';

function Navbar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={`navbar ${collapsed ? 'collapsed' : ''}`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <h2>Women Metrics</h2>
      <ul>
        <li>
          <Link to="/"> {/* Enlace a Home */}
            <ion-icon name="home"></ion-icon>
            <span className="text">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/chatbot"> {/* Enlace a ChatBot */}
            <ion-icon name="chatbubbles"></ion-icon>
            <span className="text">ChatBot</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard"> {/* Enlace a Dashboard */}
            <ion-icon name="analytics"></ion-icon>
            <span className="text">Dashboard</span>
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
