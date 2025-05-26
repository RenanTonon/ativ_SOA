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
    <div className="flex flex-col w-screen h-screen items-center justify-center content-center gap-3 mt-20">
      <div className="flex flex-col items-center justify-center content-center w-[700px] text-center gap-3 border border-solid border-black p-10 rounded-[15px] bg-zinc-100 font-mono">
        <h1>Como Usar?</h1>
        <p>Quer saber se o seu nome foi tendência? Use o filtro abaixo para descobrir! Digite um nome, escolha o período que deseja analisar e veja, em um gráfico interativo, quantas vezes ele foi registrado ao longo dos anos. É rápido, fácil e visual!</p>
      </div>
      <div className="flex items-center justify-center content-center w-[700px] text-center gap-3 border border-solid border-black p-10 rounded-[15px] bg-zinc-100 font-mono">
        <InputText nameLabel="Nome" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
        <InputSelect label="Ano inicial" opcoes={["1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010"]} value={anoSelecionado} onChange={(e) => setAnoSelecionado(e.target.value)}/>
        <InputSelect label="Ano Final" opcoes={["1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010"]} value={anoSelecionado2} onChange={(e) => setAnoSelecionado2(e.target.value)}/>
        <button className="flex bg-blue-600 p-2 rounded-[10px] text-white w-[200px] h-[40px]  items-center justify-center content-center hover:bg-black hover:text-white duration-300 font-mono" onClick={() => buscarNomesPorIntervalo(nome, anoSelecionado, anoSelecionado2)}>Carregar</button>
      </div>

      <div className="w-full max-w-[600px] mt-6 px-4">
        <Bar data={data} options={chartOptions} />
      </div>
      <NavigateButton path="/home" conteudo="Voltar"/>
    </div>
  );
};

export default RankingPage;