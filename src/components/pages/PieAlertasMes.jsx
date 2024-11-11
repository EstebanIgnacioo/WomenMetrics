import * as React from "react";
import { Pie, PieChart as RechartsPieChart, Label } from "recharts";
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

export const description = "A donut chart with alert data by month";

// Configuración del gráfico (ChartConfig)
export const chartConfig = {
  visitors: {
    label: "Total Alertas por Mes",
  },
  colorPalette: [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]
};

export default function PieChartComponent() {
  const [chartData, setChartData] = React.useState([]);
  const [totalAlertas, setTotalAlertas] = React.useState(0);

  React.useEffect(() => {
    // Llamada a la API para obtener los datos
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/alertas-por-mes")
      .then(response => response.json())
      .then(data => {
        // Procesar los datos para el gráfico
        const processedData = Object.entries(data.alertasPorMes).map(([mes, total_alertas], index) => ({
          mes: mes,
          total_alertas,
          fill: chartConfig.colorPalette[index % chartConfig.colorPalette.length]
        }));
        setChartData(processedData);
        setTotalAlertas(Object.values(data.alertasPorMes).reduce((acc, curr) => acc + curr, 0));
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Alertas por Mes</CardTitle>
        <CardDescription>Del año actual</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RechartsPieChart width={250} height={250}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="total_alertas"
              nameKey="mes"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAlertas.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Alertas
                        </tspan>
                      </text>
                    );
                  }
                  return null;  // Para evitar errores si viewBox es nulo
                }}
              />
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>

    </Card>
  );
}
