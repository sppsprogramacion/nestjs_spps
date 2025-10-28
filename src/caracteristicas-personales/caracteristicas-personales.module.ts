import { Module } from '@nestjs/common';
import { CaracteristicasPersonalesService } from './caracteristicas-personales.service';
import { CaracteristicasPersonalesController } from './caracteristicas-personales.controller';

@Module({
  controllers: [CaracteristicasPersonalesController],
  providers: [CaracteristicasPersonalesService]
})
export class CaracteristicasPersonalesModule {}
