import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart with alert data by department";

// Configuración del gráfico (ChartConfig)
export const chartConfig = {
  visitors: {
    label: "Total Alertas Derivadas",
  },
  colorPalette: [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]
};

export default function BarChartComponent() {
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    // Llamada a la API para obtener los datos
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/alertas-derivadas-por-departamento")
      .then(response => response.json())
      .then(data => {
        // Procesar los datos para el gráfico
        const processedData = data.departamentos.map((departamento, index) => ({
          nombre_departamento: departamento.nombre_departamento,
          total_alertas_derivadas: departamento.total_alertas_derivadas,
          fill: chartConfig.colorPalette[index % chartConfig.colorPalette.length]
        }));
        setChartData(processedData);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Alertas Derivadas por Departamento</CardTitle>
        <CardDescription>Del mes actual</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-[4/3] max-h-[250px]"
        >
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre_departamento" />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
            
              <Bar
                dataKey="total_alertas_derivadas"
                fill="#8884d8"
                radius={[10, 10, 0, 0]}  // Bordes redondeados para las barras
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
}
