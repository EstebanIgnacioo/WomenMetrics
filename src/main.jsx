import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboards from './pages/Dashboards';
import ChatBot from './pages/ChatBot';

import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home como principal */}
        <Route path="/dashboard" element={<Dashboards />} /> {/* Ruta para Dashboard */}
        <Route path="/chatbot" element={<ChatBot />} /> {/* Ruta para ChatBot */}
      </Routes>
    </Router>
  </StrictMode>
);
