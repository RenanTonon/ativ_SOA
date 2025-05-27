import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import InputText from "../../components/inputs/InputText";
import NavigateButton from "../../components/buttons/NavigateButton";
import { ApiComparacao } from "../../api/ApiComparacao";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Comparação de dois nomes ao longo do tempo (nacional)",
    },
  },
};

export const ComparacaoPage = () => {
  const [nome, setNome] = useState("");
  const [nome2, setNome2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const comparadorDeNomes = async (nome: string, nome2: string) => {
    if (!nome.trim() || !nome2.trim()) {
      setError("Por favor, preencha os dois nomes.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const api = await ApiComparacao(nome, nome2);

      const labels = api.map((item: any) => item.decada);

      setData({
        labels,
        datasets: [
          {
            label: nome,
            data: api.map((item: any) => item.frequencia),
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
          },
          {
            label: nome2,
            data: api.map((item: any) => item.frequencia2),
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      });
    } catch (error) {
      setError("Erro ao buscar dados da API.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center content-center gap-3 mt-20">
      <div className="flex flex-col items-center justify-center content-center w-[700px] text-center gap-3 border border-solid border-black p-10 rounded-[15px] bg-zinc-100 font-mono">
        <h1>Compare nomes e veja quem fez mais sucesso!</h1>
        <p>
          Digite dois nomes no campo abaixo e veja, em um gráfico comparativo, como a frequência de cada um evoluiu ao longo das décadas. Descubra qual nome foi mais popular em cada período e compare tendências de forma visual e interativa!
        </p>
      </div>
      <div className="flex items-center justify-center content-center w-[700px] text-center gap-3 border border-solid border-black p-10 rounded-[15px] bg-zinc-100 font-mono">
        <InputText
          nameLabel="Nome 1"
          placeholder="Digite o primeiro nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <InputText
          nameLabel="Nome 2"
          placeholder="Digite o segundo nome"
          value={nome2}
          onChange={(e) => setNome2(e.target.value)}
        />
        <button
          disabled={loading}
          className={`flex p-2 rounded-[10px] text-white w-[200px] h-[40px] items-center justify-center content-center font-mono duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-black hover:text-white"
          }`}
          onClick={() => comparadorDeNomes(nome, nome2)}
        >
          {loading ? "Carregando..." : "Carregar"}
        </button>
      </div>

      {error && <p className="text-red-600 font-mono">{error}</p>}

      <div className="w-full max-w-[600px] mt-6 px-4">
        <Line data={data} options={chartOptions} />
      </div>
      <NavigateButton path="/home" conteudo="Voltar" />
    </div>
  );
};

export default ComparacaoPage;
