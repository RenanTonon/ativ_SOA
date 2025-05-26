import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,} from "chart.js";
import InputSelect from "../../components/inputs/InputSelect";
import InputText from "../../components/inputs/InputText";
import NavigateButton from "../../components/buttons/NavigateButton";

import { ApiRanking } from "../../api/ApiRanking";

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


export const RankingPage = () => {
  const [anoSelecionado, setAnoSelecionado] = useState("");
  const [anoSelecionado2, setAnoSelecionado2] = useState("");
  const [nome, setNome] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>({
    datasets: [
      {
        label: "Evolução do ranking de Nomes",
        data: [],
        backgroundColor: ["rgba(8, 128, 128, 0.6)"],
        parsing: {
          xAxisKey: "decada",
          yAxisKey: "frequencia",
        },
      },
    ],
  });

  const buscarNomesPorIntervalo = async (nome:string, anoInicial:string, anoFinal:string) => {
        try {
          var api = await ApiRanking(nome,anoInicial,anoFinal);
          
          setData({
            datasets: [
              {
                label: "Evolução do ranking de Nomes",
                data: api,
                backgroundColor: ["rgba(8, 128, 128, 0.6)"],
                parsing: {
                  xAxisKey: "decada",
                  yAxisKey: "frequencia",
                },
              },
            ],
          });
        } catch (error) {
          setError("Erro ao buscar dados da API.");
          console.error(error);
        }
      };

      // useEffect(() => {
      //   if (nome && anoSelecionado && anoSelecionado2) {
      //     buscarNomesPorIntervalo(nome, anoSelecionado, anoSelecionado2);
      //   }
      // }, [nome, anoSelecionado, anoSelecionado2]);

      // if (error) return <p>{error}</p>;

      
  
  
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center content-center">
      <div className="flex items-center gap-4">
        <InputText nameLabel="Nome" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        <InputSelect label="Ano inicial" opcoes={["1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010"]} value={anoSelecionado} onChange={(e) => setAnoSelecionado(e.target.value)}/>
        <InputSelect label="Ano Final" opcoes={["1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010"]} value={anoSelecionado2} onChange={(e) => setAnoSelecionado2(e.target.value)}/>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => buscarNomesPorIntervalo(nome, anoSelecionado, anoSelecionado2)}>Carregar</button>
      </div>

      <div className="w-full max-w-[600px] mt-6 px-4">
        <Bar data={data} options={chartOptions} />
      </div>
      <NavigateButton path="/home" conteudo="Voltar"/>
    </div>
  );
};

export default RankingPage;