import axios from "axios";
import type { NomeFrequenteType } from "../types/NomeFrequenciaType";

export const ApiRanking = async (nome: string, anoInicial: string, anoFinal: string): Promise<NomeFrequenteType[]> => {
  //exemplo de teste
  //const test = [{ decada: anoInicial, frequencia: 17000 }, { decada: anoFinal, frequencia: 20000 }, { decada: anoInicial, frequencia: 19000 }, { decada: anoFinal, frequencia: 22000 }];
  const response = await axios.get(`http://localhost:3000/names/${nome}/${anoInicial}/${anoFinal}`);
  const ibge = response.data.dados;
  const formmated: NomeFrequenteType[] = ibge.map((item: any) => ({
    decada: item.periodo?.toString(),
    frequencia: item.frequencia
  }));
    

  return formmated;
};


