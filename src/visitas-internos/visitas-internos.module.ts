import { Module } from '@nestjs/common';
import { VisitasInternosService } from './visitas-internos.service';
import { VisitasInternosController } from './visitas-internos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitaInterno } from './entities/visitas-interno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VisitaInterno
    ])
  ],
  controllers: [VisitasInternosController],
  providers: [VisitasInternosService]
})
export class VisitasInternosModule {}
