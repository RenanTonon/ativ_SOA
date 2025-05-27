import axios from "axios";
import type { ComparadorFrequenciaType } from "../types/ComparadorFrequenciaType";


export const ApiComparacao = async (nome:string,nome2:string): Promise<ComparadorFrequenciaType[]> => {
  //exemplo de teste
  /*const test = [ { decada: "1920", nome1: nome, frequencia: 20000, nome2: nome2, frequencia2: 18000 },
  { decada: "1930", nome1: nome, frequencia: 22000, nome2: nome2, frequencia2: 17000 },
  { decada: "1940", nome1: nome, frequencia: 18000, nome2: nome2, frequencia2: 21000 },
  { decada: "1950", nome1: nome, frequencia: 25000, nome2: nome2, frequencia2: 23000 },
  { decada: "1960", nome1: nome, frequencia: 27000, nome2: nome2, frequencia2: 19000 },
  { decada: "1970", nome1: nome, frequencia: 30000, nome2: nome2, frequencia2: 28000 },
  { decada: "1980", nome1: nome, frequencia: 22000, nome2: nome2, frequencia2: 24000 },
  { decada: "1990", nome1: nome, frequencia: 16000, nome2: nome2, frequencia2: 15000 },
  { decada: "2000", nome1: nome, frequencia: 12000, nome2: nome2, frequencia2: 18000 },
  { decada: "2010", nome1: nome, frequencia: 8000, nome2: nome2, frequencia2: 10000 },
  { decada: "2020", nome1: nome, frequencia: 5000, nome2: nome2, frequencia2: 7000 },];
  */
  const response = await axios.get(`http://localhost:3000/compare/${nome}/${nome2}`);
  const ibge = response.data;

  const formatted: ComparadorFrequenciaType[] = ibge.map((item: any) => {
    const nomes = item.nomes || {};
    return {
      decada: item.periodo?.toString() ?? "",
      nome1: nome.toUpperCase(),
      frequencia: nomes[nome.toUpperCase()] ?? 0,
      nome2: nome2.toUpperCase(),
      frequencia2: nomes[nome2.toUpperCase()] ?? 0
    };
  });

  return formatted;

};

