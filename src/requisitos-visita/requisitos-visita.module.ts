import { Module } from '@nestjs/common';
import { RequisitosVisitaService } from './requisitos-visita.service';
import { RequisitosVisitaController } from './requisitos-visita.controller';

@Module({
  controllers: [RequisitosVisitaController],
  providers: [RequisitosVisitaService]
})
export class RequisitosVisitaModule {}
