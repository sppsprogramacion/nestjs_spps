import { Module } from '@nestjs/common';
import { ProhibicionesVisitaService } from './prohibiciones-visita.service';
import { ProhibicionesVisitaController } from './prohibiciones-visita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProhibicionVisita } from './entities/prohibiciones-visita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProhibicionVisita
    ])
  ],
  controllers: [ProhibicionesVisitaController],
  providers: [ProhibicionesVisitaService]
})
export class ProhibicionesVisitaModule {}
