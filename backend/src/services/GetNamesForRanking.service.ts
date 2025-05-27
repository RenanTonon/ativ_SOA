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

    this.bubbleSortPorPeriodo(dados);

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

  bubbleSortPorPeriodo(dados: NomeResposta) {
    const arr = dados.res;

    const extrairInicio = (periodo: string): number => {
      const match = periodo.match(/\[(\d+),/);
      return match ? parseInt(match[1], 10) : 0;
    };

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (extrairInicio(arr[j].periodo) > extrairInicio(arr[j + 1].periodo)) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
  }

  async getLocalForTopNames(): Promise<string> {
    const response = await axios.get<LocalResposta>(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking`);
    const dados = response.data;

    dados.forEach(item => {
      console.log(`Localidade: ${item.localidade}`);
      item.res.forEach(nomeInfo => {
        console.log(`Nome: ${nomeInfo.nome}, Frequência: ${nomeInfo.frequencia}, Ranking: ${nomeInfo.ranking}`);
      });
    });

    return 'Hello World!';
  }

  async getMunicipiosPorEstado(estadoCodigo: number) {
    const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoCodigo}/municipios`);
    return response.data;
  }




}
