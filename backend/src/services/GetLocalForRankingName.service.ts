import { Injectable } from '@nestjs/common';
import axios from 'axios';

type Municipio = {
  id: string;
  nome: string;
  microrregiao: {
    mesorregiao: {
      UF: {
        id: string;
        nome: string;
        sigla: string;
      };
    };
  };
};

type Estado = {
  id: string;
  nome: string;
  sigla: string;
};

type NomeRanking = {
  nome: string;
  frequencia: number;
};

@Injectable()
export class GetLocalForRankingNameService {
  private estadosCache: Estado[] = [];
  private municipiosCache: Municipio[] = [];

  private async getEstados() {
    if (this.estadosCache.length === 0) {
      const res = await axios.get<Estado[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
      this.estadosCache = res.data;
    }
  }

  private async getMunicipios() {
    if (this.municipiosCache.length === 0) {
      const res = await axios.get<Municipio[]>('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
      this.municipiosCache = res.data;
    }
  }

  private async getCodigoIBGE(localidade: string): Promise<string | null> {
    await this.getEstados();
    await this.getMunicipios();

    const localLower = localidade.toLowerCase();

    const estado = this.estadosCache.find(e => e.sigla.toLowerCase() === localLower);
    if (estado) return estado.id;

    const estadoNome = this.estadosCache.find(e => e.nome.toLowerCase() === localLower);
    if (estadoNome) return estadoNome.id;

    const municipioCodigo = this.municipiosCache.find(m => m.id === localidade);
    if (municipioCodigo) return municipioCodigo.id;

    const municipioNome = this.municipiosCache.find(m => m.nome.toLowerCase() === localLower);
    if (municipioNome) return municipioNome.id;

    return null;
  }

  private async buscarPorDecada(localidade: string, decada: number): Promise<NomeRanking[]> {
    const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/?localidade=${localidade}&decada=${decada}`;
    const res = await axios.get(url);
    return res.data[0]?.res?.slice(0, 3) ?? [];
  }

  async buscarRankingPorLocalidade(localidade: string): Promise<
    { periodo: string; nomes: { nome: string; frequencia: number }[] }[]
  > {
    const codigo = await this.getCodigoIBGE(localidade);
    if (!codigo) throw new Error('Localidade não encontrada');

    const decadas = [1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];

    const resultados: { periodo: string; nomes: { nome: string; frequencia: number }[] }[] = [];

    for (const decada of decadas) {
      const nomes = await this.buscarPorDecada(codigo, decada);
      resultados.push({
        periodo: `${decada}`,
        nomes: nomes.map(n => ({
          nome: n.nome.toUpperCase(),
          frequencia: n.frequencia,
        })),
      });
    }

    return resultados;
  }
}
