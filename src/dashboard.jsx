// dashboard.jsx
import React from 'react';
import './App.css'; // Asegúrate de que este archivo exista y esté en la ruta correcta
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Revisa la ruta de estos componentes
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"; // Revisa que 'recharts' esté instalado
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function Dashboard({ chartData, chartConfig, tableData }) {
  return (
    <div style={{ padding: '30px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <div style={{ marginBottom: '20px', borderRadius: '20px', overflow: 'hidden' }}>
        <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
          <BarChart data={chartData} width={300} height={200}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="x"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="bar1" fill={chartConfig.bar1.color} radius={4} />
            <Bar dataKey="bar2" fill={chartConfig.bar2.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{row.invoice}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.method}</TableCell>
                <TableCell className="text-right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Dashboard;
