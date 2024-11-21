"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { HomeIcon, } from '@heroicons/react/24/outline';


// Contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
  const [authReady, setAuthReady] = useState(false); // Estado de autenticación listo

  useEffect(() => {
    // Recuperar el usuario desde localStorage cuando el componente se monta
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Si hay un usuario, cargamos su información
    }
    setAuthReady(true); // Marcamos como listo el contexto
  }, []);

  // Función de login que hace la llamada a la API
  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://api-women-security-app-544496114867.southamerica-west1.run.app/api/login-admin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo: email, password }),
          
        }
        
      );

   
      // Verificar si la respuesta es 200 OK
      if (response.ok) {
        const data = await response.json();
        console.log(data)
       

        if (data.persona && data.perfil) {
          // Guardamos toda la información del usuario
          const userData = {
            persona: data.persona,
            perfil: data.perfil,
          };

          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData)); // Guardamos el usuario en localStorage
          console.log("Usuario autenticado:", userData);
          
        } else {
          throw new Error("Respuesta de la API no contiene datos válidos.");
        }
      } else {
        throw new Error("Error en el inicio de sesión: " + response.status);
      }
    } catch (error) {
      console.error("Error en el login:", error);
      throw error;
    }
  };

  // Función de logout que limpia el estado del usuario
  const logout = () => {
    setUser(null); // Limpia el estado del usuario
    localStorage.removeItem("user"); // Elimina el usuario de localStorage
    setAuthReady(false); // Opcional: si deseas reiniciar authReady
  };



   // Función que recarga la página
   const handleReload = () => {
    window.location.reload();
  };

  // Renderizado condicional para asegurar que solo se muestren los children cuando authReady sea true
  if (!authReady) {
    return (
      <div className="flex flex-col mt-72 items-center justify-center h-full">
        <h1 className="text-white text-3xl mb-4">Volver a Home</h1>
        <button
          onClick={handleReload}
          className="p-2 bg-[#742d70] text-white rounded-full"
        >
          <HomeIcon className="w-16 h-16 p-2 rounded-full mx-auto" />
        </button>
      </div>
    );
  }



  return (
    <AuthContext.Provider value={{ user, authReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthContextProvider");
  }
  return context;
};

export default AuthContext;
