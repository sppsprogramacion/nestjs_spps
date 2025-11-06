import { Module } from '@nestjs/common';
import { IngresosInternoService } from './ingresos-interno.service';
import { IngresosInternoController } from './ingresos-interno.controller';

@Module({
  controllers: [IngresosInternoController],
  providers: [IngresosInternoService]
})
export class IngresosInternoModule {}
