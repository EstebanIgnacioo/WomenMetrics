"use client";

import { createContext, useState, useEffect, useContext } from "react";


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
    console.log(storedUser)
  }, []);

  // Función de login que hace la llamada a la API
  const login = async (email, password) => {
    try {
      const response = await fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: email, password }),
      });

      // Verificar si la respuesta es 200 OK
      if (response.ok) {
        const data = await response.json();
        if (data.persona) {
          const userData = {
            rut: data.persona.rut, // Solo guardamos el `rut` o los datos necesarios
          };
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData)); // Guardamos el usuario en localStorage
          console.log(userData)
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

  

  // Renderizado condicional para asegurar que solo se muestren los children cuando authReady sea true
  //if (!authReady) {
  //  return <div>Loading...</div>; // Puedes poner un spinner de carga aquí si lo prefieres
  //} //

   // Renderizado condicional para asegurar que solo se muestren los children cuando authReady sea true
  if (!authReady) {
    return <div>Loading...</div>; // Puedes poner un spinner de carga aquí si lo prefieres
  } //




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
