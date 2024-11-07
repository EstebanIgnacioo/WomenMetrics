import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./admin/AdminLayout";
import Home from "./pages/Home";
import Dashboards from "./admin/Dashboards/Dashboards";
import ChatBot from "./admin/ChatBot/ChatBot";
import Descargar from "./pages/Descargar";
import Noticias from "./pages/Noticias";
import Ayuda from "./pages/Ayuda";
import Login from "./auth/inicio-sesion/inicio-sesion.jsx";
import { AuthContextProvider } from "./contexts/AuthContext"; // Importa el proveedor de autenticación
import AuthCheck from "./components/AuthCheck"; // Importa AuthCheck para proteger rutas

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ruta principal */}
          <Route path="/descargar" element={<Descargar />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/ayuda" element={<Ayuda />} />
          <Route path="/inicio-sesion" element={<Login />} />

          {/* Rutas de administración protegidas */}
          <Route
            path="/admin"
            element={
              <AuthCheck>
                <AdminLayout />
              </AuthCheck>
            }
          >
            <Route path="dashboard" element={<Dashboards />} /> {/* Ruta para Dashboard en layout Admin */}
            <Route path="chatbot" element={<ChatBot />} /> {/* Ruta para ChatBot en layout Admin */}
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  </StrictMode>
);
