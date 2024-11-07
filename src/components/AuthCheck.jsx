import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AuthCheck = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    console.log("No autenticado, redirigiendo...");
    return <Navigate to="/" />; // Redirige al login si no hay usuario
  }

  return children; // Si el usuario está autenticado, muestra el contenido protegido
};

export default AuthCheck;
