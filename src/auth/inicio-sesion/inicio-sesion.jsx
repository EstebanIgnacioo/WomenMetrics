"use client";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import NavBar from '../../components/pages/NavBar';
import Footer from '../../components/pages/Footer';
import Logo from '../../assets/img/Logo_1_black.png';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate(); // Define navigate para redirección
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña




  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Llamamos a la función login que realiza la validación con la API
      await login(email, password);
      navigate("/admin/dashboard"); // Redirige al dashboard de admin tras el inicio de sesión exitoso
    } catch (error) {
      setError("Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white animate-gradient-move min-h-screen flex justify-center items-center">
        <div className="flex justify-center items-center z-10 w-full ">
          <form
            className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full transform transition-all hover:scale-110"
            onSubmit={handleLogin}
          >
            <img
              alt="Your Company"
              src={Logo}
              className="h-20 w-auto hidden sm:block mx-auto"
            />
            <h2 className="text-3xl p-2 font-bold text-center text-indigo-900">
              Iniciar Sesión
            </h2>
            <h2 className="text-xs text-center text-gray-400 mb-6">
              Solo Administradores
            </h2>
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"} // Cambia el tipo según el estado showPassword
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Alterna la visibilidad
                className="absolute right-3 top-1/2 transform   text-gray-800"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-auto w-5" />
                ) : (
                  <EyeIcon className="h-auto w-5" />
                )}
              </button>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2  py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all hover:scale-110"
              >
                Iniciar Sesión
              </button>
            </div>

          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
