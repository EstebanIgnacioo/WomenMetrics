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
          <span className="icon">🏠</span>
          <span className="text">Home</span>
        </li>
        <li>
          <span className="icon">📊</span>
          <span className="text">About</span>
        </li>
        <li>
          <span className="icon">📞</span>
          <span className="text">Contact</span>
        </li>
        <li>
          <span className="icon">📈</span>
          <span className="text">Dashboard</span>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
