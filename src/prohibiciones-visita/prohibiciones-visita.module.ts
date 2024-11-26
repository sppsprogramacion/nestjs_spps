import { Module } from '@nestjs/common';
import { ProhibicionesVisitaService } from './prohibiciones-visita.service';
import { ProhibicionesVisitaController } from './prohibiciones-visita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProhibicionVisita } from './entities/prohibiciones-visita.entity';
import { BitacoraProhibicionesVisitaService } from 'src/bitacora-prohibiciones-visita/bitacora-prohibiciones-visita.service';
import { BitacoraProhibicionVisita } from 'src/bitacora-prohibiciones-visita/entities/bitacora-prohibiciones-visita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProhibicionVisita,
      BitacoraProhibicionVisita
    ])
  ],
  controllers: [ProhibicionesVisitaController],
  providers: [ProhibicionesVisitaService, BitacoraProhibicionesVisitaService]
})
export class ProhibicionesVisitaModule {}
