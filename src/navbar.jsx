import React, { useState } from 'react';
import './App.css'; // Asegúrate de tener este archivo CSS

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
          <ion-icon name="home"></ion-icon>
          <span className="text">Home</span>
        </li>
        <li>
          <ion-icon name="chatbubbles"></ion-icon>
          <span className="text">ChatBot</span>
        </li>
        <li>
          <ion-icon name="analytics"></ion-icon>
          <span className="text">Dashboard</span>
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
