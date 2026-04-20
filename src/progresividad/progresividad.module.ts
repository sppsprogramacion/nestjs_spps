import { Module } from '@nestjs/common';
import { ProgresividadService } from './progresividad.service';
import { ProgresividadController } from './progresividad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concepto } from 'src/concepto/entities/concepto.entity';
import { Progresividad } from './entities/progresividad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Progresividad
    ])
  ],
  controllers: [ProgresividadController],
  providers: [ProgresividadService]
})
export class ProgresividadModule {}
