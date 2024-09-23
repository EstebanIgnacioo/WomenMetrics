import React from 'react';
import Navbar from '../components/pages/navbar2'; 
import Dashboard from '../components/pages/dashboard'; 



import '../styles/App.css'; // Asegúrate de tener este archivo CSS

function Dashboards() {





  // Definir datos diferentes para cada Dashboard
  const dashboardData = [
    {
      chartData: [
        { x: "Esteban", bar1: 186, bar2: 80 },
        { x: "Jorge", bar1: 305, bar2: 200 },
        { x: "Gabriel", bar1: 237, bar2: 120 },
        { x: "Camilo", bar1: 237, bar2: 120 },
      ],
      chartConfig: {
        bar1: { color: "#2563eb" },
        bar2: { color: "#60a5fa" },
      },
      tableData: [
        { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
        { invoice: "INV002", status: "Unpaid", method: "Cash", amount: "$150.00" },
      ],
    },
    
    {
      chartData: [
        { x: "April", bar1: 73, bar2: 190 },
        { x: "May", bar1: 209, bar2: 130 },
        { x: "June", bar1: 214, bar2: 140 },
      ],
      chartConfig: {
        bar1: { color: "#2563eb" },
        bar2: { color: "#60a5fa" },
      },
      tableData: [
        { invoice: "INV003", status: "Paid", method: "Bank Transfer", amount: "$300.00" },
        { invoice: "INV004", status: "Pending", method: "Credit Card", amount: "$200.00" },
      ],
    },
  ];

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <div className="dashboard-grid">
          {dashboardData.map((data, index) => (
            <Dashboard
              key={index}
              chartData={data.chartData}
              chartConfig={data.chartConfig}
              tableData={data.tableData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboards;
