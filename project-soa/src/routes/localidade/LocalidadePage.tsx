import { useEffect, useState } from "react";
import { ApiLocalidade} from "../../api/ApiLocalidade";
import type { LocalidadeFrequenciaType } from "../../types/LocalidadeFrequenciaType";
import InputSelect from "../../components/inputs/InputSelect";
import NavigateButton from "../../components/buttons/NavigateButton";

const LocalidadePage = () => {
  const [dados, setDados] = useState<LocalidadeFrequenciaType[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [UfSelecionado,setUfSelecionado] = useState("");

  const buscarNomesPorUF = async () => {
      try {
        const api = await ApiLocalidade(UfSelecionado);
        setDados(api);
      } catch (error) {
        setErro("Erro ao buscar dados da API.");
        console.error(error);
      }
    };

  useEffect(() => {
    buscarNomesPorUF();
  }, []);

  if (erro) return <p>{erro}</p>;

  if (!dados) return <p>Carregando...</p>;

  

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center content-center gap-10">
      <div className="flex items-center gap-4">
        <InputSelect label="Selecione UF" opcoes={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN","RS", "RO", "RR", "SC", "SP", "SE", "TO"]} value={UfSelecionado} onChange={(e) => setUfSelecionado(e.target.value)} />
        <button onClick={() => buscarNomesPorUF()} className="bg-blue-600 p-2 rounded-[10px] text-white ">Atualizar</button>
      </div>
      
      <table  style={{ borderCollapse: "collapse", width: "500px", border: "2px solid black" }}>
        <thead>
          <tr style={{border: "2px solid black"}}>
            <th style={{border: "2px solid black"}}>DECADA</th>
            <th style={{border: "2px solid black"}}>1°</th>
            <th style={{border: "2px solid black"}}>2°</th>
            <th style={{border: "2px solid black"}}>3°</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr key={index}>
              {Object.keys(item).map((key) => (
                <td key={key} style={{ padding: "8px", textAlign: "center" ,border: "2px solid black"}}>
                  {item[key as keyof typeof item]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <NavigateButton path="/home" conteudo="Voltar"/>
    </div>
  );
};

export default LocalidadePage;
