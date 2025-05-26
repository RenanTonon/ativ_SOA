import type { LocalidadeFrequenciaType } from "../types/LocalidadeFrequenciaType";

export const ApiLocalidade = async (uf:string): Promise<LocalidadeFrequenciaType[]> => {
  //exemplo de teste
  const test = [{ decada: "1920", nome1: "string", nome2: "string", nome3: "string" },{ decada: "1930", nome1: "Renan", nome2: "Lucas", nome3: "Willian" }];

  return test;
};

