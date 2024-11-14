import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart as RechartsPieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {

  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

// Configuración del gráfico (ChartConfig)
export const chartConfig = {
  visitors: {
    label: "Total Alertas",
  },
  colorPalette: [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]
}

export default function PieChart() {
  const [chartData, setChartData] = React.useState([]);
  const [totalAlertas, setTotalAlertas] = React.useState(0);

  React.useEffect(() => {
    // Llamada a la API para obtener los datos
    fetch("https://api-women-security-app-544496114867.southamerica-west1.run.app/api/alertas-por-comuna")
      .then(response => response.json())
      .then(data => {
        // Procesar los datos para el gráfico
        const processedData = data.alertas_por_comuna.map((alerta, index) => ({
          browser: alerta.nombre_comuna,
          visitors: alerta.total_alertas,
          fill: chartConfig.colorPalette[index % chartConfig.colorPalette.length]
        }));
        setChartData(processedData);
        setTotalAlertas(data.total_alertas);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Alertas por Comuna</CardTitle>
        <CardDescription>Del año actual</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig} 
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RechartsPieChart width={250} height={250}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
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
                    )
                  }
                }}
              />
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
