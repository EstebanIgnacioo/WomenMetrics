import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UsuariosPorComunaTable() {
  const [usuarios, setUsuarios] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [alertasPorComuna, setAlertasPorComuna] = useState([]);
  const [totalAlertas, setTotalAlertas] = useState(0); // Estado para el total de alertas
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el filtro

  useEffect(() => {
    // Llamada a la API para obtener los datos de usuarios por comuna
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/usuarios-por-comuna")
      .then((response) => response.json())
      .then((data) => {
        setUsuarios(data.usuarios_por_comuna);
        setTotalUsuarios(data.total_usuarios);
      })
      .catch((error) => console.error("Error fetching users data:", error));

    // Llamada a la API para obtener los datos de alertas por comuna
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/alertas-por-comuna")
      .then((response) => response.json())
      .then((data) => {
        setAlertasPorComuna(data.alertas_por_comuna);
        // Calcular el total de alertas
        const total = data.alertas_por_comuna.reduce((acc, alerta) => acc + alerta.total_alertas, 0);
        setTotalAlertas(total);
      })
      .catch((error) => console.error("Error fetching alerts data:", error));
  }, []);

  // Función para obtener las alertas por comuna basándose en el nombre de la comuna
  const obtenerAlertasPorComuna = (nombreComuna) => {
    const alerta = alertasPorComuna.find(
      (alerta) => alerta.nombre_comuna.trim().toLowerCase() === nombreComuna.trim().toLowerCase()
    );
    return alerta ? alerta.total_alertas : 0; // Si no hay alerta, retorna 0
  };

  // Función para filtrar las comunas por el término de búsqueda
  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre_comuna.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular el total de usuarios y alertas para los resultados filtrados
  const totalUsuariosFiltrados = filteredUsuarios.reduce((acc, usuario) => acc + usuario.total_usuarios, 0);
  const totalAlertasFiltradas = filteredUsuarios.reduce((acc, usuario) => acc + obtenerAlertasPorComuna(usuario.nombre_comuna), 0);

  return (
    <div 
    style={{ backgroundColor: "#1f0a1e", border: "1px solid #3b1c3a" }}
    className="w-full p-6 rounded-xl">
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar comuna"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-1/4 text-black"
      />

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Comuna</TableHead>
            <TableHead className="w-1/3">Usuarios</TableHead>
            <TableHead className="w-1/3">Alertas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsuarios.map((usuario) => (
            <TableRow key={usuario.nombre_comuna}>
              <TableCell className="font-medium">{usuario.nombre_comuna}</TableCell>
              <TableCell>{usuario.total_usuarios}</TableCell>
              <TableCell>{obtenerAlertasPorComuna(usuario.nombre_comuna)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">
              {totalUsuariosFiltrados} usuarios y {totalAlertasFiltradas} alertas
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
