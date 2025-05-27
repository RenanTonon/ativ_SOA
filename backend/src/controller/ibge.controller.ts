import { Controller, Get, Param } from '@nestjs/common';
import { GetNamesForRankingService } from '../services/GetNamesForRanking.service';
import { GetLocalForRankingNameService } from '../services/GetLocalForRankingName.service';
import { CompareNamesForThePopularity } from '../services/CompareNamesForThePopularity';


@Controller()
export class IBGEController {
  constructor(private readonly getNamesForRankingService: GetNamesForRankingService,
    private readonly getLocalForRankingNameService: GetLocalForRankingNameService,
    private readonly compareNamesForThePopularity: CompareNamesForThePopularity
  ) {}

  @Get('/names/:id/:numI/:numF')
  async getNameForRanking(@Param('id') nome: string,@Param('numI') Dataini: number,@Param('numF') DataFim: number): Promise<string> {
    return await this.getNamesForRankingService.getNameForRanking(nome,Dataini,DataFim);
  }

  @Get('/local/:name')
  async getLocalForTopNamess(@Param('name') name: string): Promise<Object[]> {
    return await this.getLocalForRankingNameService.buscarRankingPorLocalidade(name);
  }

  @Get('/compare/:nameI/:nameII')
  async getNamesForThePopularity(@Param('nameI') name1: string,@Param('nameII') name2: string){
    return await this.compareNamesForThePopularity.compararNomes(name1,name2);
  }

}
