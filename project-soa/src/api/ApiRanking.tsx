import type { NomeFrequenteType } from "../types/NomeFrequenciaType";

export const ApiRanking = async (nome:string,anoInicial:string,anoFinal:string): Promise<NomeFrequenteType[]> => {
  //exemplo de teste
  const test = [{decada: anoInicial, frequencia: 17000},{decada: anoFinal, frequencia: 20000},{decada: anoInicial, frequencia: 19000},{decada: anoFinal, frequencia: 22000}];

  return test;
};


