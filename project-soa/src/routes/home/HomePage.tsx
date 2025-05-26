import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,} from "chart.js";
import InputSelect from "../../components/inputs/InputSelect";
import InputText from "../../components/inputs/InputText";

// Registrando os módulos necessários
ChartJS.register(CategoryScale, LinearScale, BarElement);

// Opções do gráfico
const chartOptions = {
  scales: {
    x: {
      type: "category" as const,
    },
    y: {
      beginAtZero: true,
    },
  },
};


interface NomeFrequencia {
  ano: number;
  frequencia: number;
}

export const HomePage = () => {
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [anoSelecionado2, setAnoSelecionado2] = useState("");
  const [nome, setNome] = useState("");

  const [data, setData] = useState<any>({
    datasets: [
      {
        label: "Evolução do ranking de Nomes",
        data: [],
        backgroundColor: "rgba(75,192,192,0.6)",
        parsing: {
          xAxisKey: "ano",
          yAxisKey: "frequencia",
        },
      },
    ],
  });

  
  const buscarDados = (nome: string, anoInicial: string, anoFinal: string) => {
    const anoInicialNum = parseInt(anoInicial);
    const anoFinalNum = parseInt(anoFinal);
    var arrNomesFrequentes: NomeFrequencia[] = [
      { ano: anoInicialNum, frequencia: 100 },
      { ano: anoFinalNum, frequencia: 120 },
    ];

   
    setData({
      datasets: [
        {
          label: "Evolução do ranking de Nomes",
          data: arrNomesFrequentes,
          backgroundColor: "rgba(75,192,192,0.6)",
          parsing: {
            xAxisKey: "ano",
            yAxisKey: "frequencia",
          },
        },
      ],
    });
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center content-center">
      <div className="flex items-center gap-4">
        <InputText nameLabel="Nome" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        <InputSelect label="Ano inicial" opcoes={["1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010"]} value={anoSelecionado} onChange={(e) => setAnoSelecionado(e.target.value)}/>
        <InputSelect label="Ano Final" opcoes={["1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010"]} value={anoSelecionado2} onChange={(e) => setAnoSelecionado2(e.target.value)}/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => buscarDados(nome, anoSelecionado, anoSelecionado2)}>Carregar</button>
      </div>

      <div className="w-[500px] mt-6">
        <Bar data={data} options={chartOptions} />
      </div>
    </div>
  );
};

export default HomePage;
