import { Injectable } from '@nestjs/common';
import axios from 'axios';



type NomeResposta = {
  nome: string;
  sexo: string | null;
  localidade: string;
  res: {
    periodo: string;
    frequencia: number;
    ranking?: number;
  }[];
};

type NomeRanking = {
  nome: string;
  frequencia: number;
  ranking: number;
};

type LocalResposta = {
  localidade: string;
  sexo: string | null;
  res: NomeRanking[];
}[];


@Injectable()
export class GetNamesForRankingService {


  async getNameForRanking(nome: string, anoInicio: number, anoFim: number): Promise<any> {
    const response = await axios.get<NomeResposta[]>(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}`);
    const dados = response.data[0];

    const resultadoFiltrado = dados.res.filter((item) => {
      const match = item.periodo.match(/\[(\d+),(\d+)\[/);
      if (!match) return false;
      const inicio = parseInt(match[1], 10);
      const fim = parseInt(match[2], 10);
      return fim > anoInicio && inicio < anoFim;
    });

    return {
      nome: dados.nome.toUpperCase(),
      dados: resultadoFiltrado.map(item => {
        const match = item.periodo.match(/\[(\d+),/);
        const inicio = match ? parseInt(match[1], 10) : 0;
        return {
          periodo: inicio,
          frequencia: item.frequencia,
        };
      }),
    };
  }





}
