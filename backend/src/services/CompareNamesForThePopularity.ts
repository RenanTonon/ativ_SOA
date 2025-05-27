import { Injectable } from '@nestjs/common';
import axios from 'axios';

type RespostaNomeItem = {
    nome: string;
    sexo: string | null;
    localidade?: string;
    res: {
        periodo: string; // Ex: "1930["
        frequencia: number;
    }[];
};

@Injectable()
export class CompareNamesForThePopularity {
    async compararNomes(nome1: string, nome2: string): Promise<{ periodo: number; nomes: Record<string, number> }[] | string> {
        const n1 = nome1.trim().toLowerCase();
        const n2 = nome2.trim().toLowerCase();

        try {
            const dados = await this.buscarDadosNomes(n1, n2);

            if (!dados[n1] && !dados[n2])
                return `Os nomes "${nome1}" e "${nome2}" não foram encontrados na base do IBGE.`;
            if (!dados[n1])
                return `O nome "${nome1}" não foi encontrado na base do IBGE.`;
            if (!dados[n2])
                return `O nome "${nome2}" não foi encontrado na base do IBGE.`;

            const acumulador: Record<
                number,
                Record<string, number>
            > = {};

            const acumular = (nome: string, res: { periodo: string; frequencia: number }[]) => {
                for (const item of res) {
                    const inicio = parseInt(item.periodo.replace('[', ''), 10);
                    if (!acumulador[inicio]) {
                        acumulador[inicio] = {};
                    }
                    acumulador[inicio][nome] = (acumulador[inicio][nome] || 0) + item.frequencia;
                }
            };

            acumular(dados[n1]!.nome.toUpperCase(), dados[n1]!.res);
            acumular(dados[n2]!.nome.toUpperCase(), dados[n2]!.res);

            const resultado = Object.entries(acumulador).map(([inicio, nomes]) => ({
                periodo: Number(inicio),
                nomes,
            }));

            resultado.sort((a, b) => a.periodo - b.periodo);

            return resultado;
        } catch (error) {
            console.error('Erro ao comparar nomes:', error);
            return 'Erro interno ao processar a comparação.';
        }
    }

    private async buscarDadosNomes(
        nome1: string,
        nome2: string,
    ): Promise<Record<string, RespostaNomeItem | undefined>> {
        const url = `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome1}|${nome2}`;
        const response = await axios.get<RespostaNomeItem[]>(url);

        const dados: Record<string, RespostaNomeItem> = {};
        for (const item of response.data) {
            dados[item.nome.toLowerCase()] = item;
        }

        return {
            [nome1]: dados[nome1],
            [nome2]: dados[nome2],
        };
    }
}
