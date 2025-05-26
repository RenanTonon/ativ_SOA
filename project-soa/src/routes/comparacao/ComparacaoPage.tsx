import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

// Registrando os módulos necessários
ChartJS.register(CategoryScale, LinearScale, BarElement);

// Dados de exemplo
const arrNomesFrequentes = [
  { nome: "Renan", frequencia: 100 },
  { nome: "Lucas", frequencia: 120 },
  { nome: "Willian", frequencia: 150 },
];

// Dados formatados para o gráfico
const data = {
  datasets: [
    {
      label: "Evolução do ranking de Nomes",
      data: arrNomesFrequentes,
      backgroundColor: "rgba(75,192,192,0.6)",
      parsing: {
        xAxisKey: "nome",
        yAxisKey: "frequencia",
      },
    },
  ],
};

// Opções do gráfico
const chartOptions = {
  scales: {
    x: {
      type: "category" as const, // Correção aqui!
    },
    y: {
      beginAtZero: true,
    },
  },
};

export const ComparacaoPage = () => {
  return (
    <div>
      <div>

      </div>
      <div className="w-[500px]">
        <Bar data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export default ComparacaoPage;
