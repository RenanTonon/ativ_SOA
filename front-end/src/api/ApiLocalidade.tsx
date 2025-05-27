import axios from "axios";
import type { LocalidadeFrequenciaType } from "../types/LocalidadeFrequenciaType";

export const ApiLocalidade = async (uf: string): Promise<LocalidadeFrequenciaType[]> => {
  //exemplo de teste
  //const test = [{ decada: "1920", nome1: "string", nome2: "string", nome3: "string" }, { decada: "1930", nome1: "Renan", nome2: "Lucas", nome3: "Willian" }];
  const response = await axios.get(`http://localhost:3000/local/${uf}`);
  const ibge = response.data;

  const formmated: LocalidadeFrequenciaType[] = ibge.map((item: any) => {
    const nomes = item.nomes || [];
    return {
      decada: item.periodo?.toString() ?? '',
      nome1: nomes[0]?.nome ?? '',
      nome2: nomes[1]?.nome ?? '',
      nome3: nomes[2]?.nome ?? ''
    }

  });
  return formmated;
};

