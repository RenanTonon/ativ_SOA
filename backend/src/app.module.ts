import { Module } from '@nestjs/common';
import { IBGEController } from './controller/ibge.controller';
import { GetNamesForRankingService } from './services/GetNamesForRanking.service';
import { GetLocalForRankingNameService } from './services/GetLocalForRankingName.service';
import { CompareNamesForThePopularity } from './services/CompareNamesForThePopularity';

@Module({
  imports: [],
  controllers: [IBGEController],
  providers: [GetNamesForRankingService, GetLocalForRankingNameService, CompareNamesForThePopularity],
})
export class AppModule {}
