import { Module } from '@nestjs/common';
import { BitacoraProhibicionesVisitaService } from './bitacora-prohibiciones-visita.service';
import { BitacoraProhibicionesVisitaController } from './bitacora-prohibiciones-visita.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BitacoraProhibicionVisita } from './entities/bitacora-prohibiciones-visita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BitacoraProhibicionVisita
    ])
  ],
  controllers: [BitacoraProhibicionesVisitaController],
  providers: [BitacoraProhibicionesVisitaService]
})
export class BitacoraProhibicionesVisitaModule {}
