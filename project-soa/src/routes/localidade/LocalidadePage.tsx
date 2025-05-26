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
    <div className="flex flex-col w-screen h-screen items-center justify-center content-center gap-10 mt-20">
      <div className="flex flex-col items-center justify-center content-center w-[700px] text-center gap-3 border border-solid border-black p-10 rounded-[15px] bg-zinc-100 font-mono">
        <h2>Descubra os nomes mais populares do seu estado!</h2>
        <p>Selecione uma Unidade Federativa (UF) no filtro abaixo e veja uma tabela com os três nomes mais registrados em cada década, desde 1930. Explore a evolução dos nomes ao longo do tempo e descubra quais marcaram gerações no seu estado!</p>
      </div>
      <div className="flex items-center justify-center content-center w-[700px] text-center gap-3 border border-solid border-black p-10 rounded-[15px] bg-zinc-100 font-mono">
        <InputSelect label="Selecione UF" opcoes={["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN","RS", "RO", "RR", "SC", "SP", "SE", "TO"]} value={UfSelecionado} onChange={(e) => setUfSelecionado(e.target.value)} />
        <button onClick={() => buscarNomesPorUF()} className="flex bg-blue-600 p-2 rounded-[10px] text-white w-[200px] h-[40px]  items-center justify-center content-center hover:bg-black hover:text-white duration-300 font-mono">Atualizar</button>
      </div>
      
      <table  style={{ borderCollapse: "collapse", width: "700px", border: "2px solid black" }}>
        <thead>
          <tr style={{border: "2px solid black"}}>
            <th style={{border: "2px solid black ",backgroundColor:"black",color:"white",padding:"10px"}}>DECADA</th>
            <th style={{border: "2px solid black ",backgroundColor:"black",color:"white",padding:"10px"}}>1°</th>
            <th style={{border: "2px solid black ",backgroundColor:"black",color:"white",padding:"10px"}}>2°</th>
            <th style={{border: "2px solid black ",backgroundColor:"black",color:"white",padding:"10px"}}>3°</th>
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
