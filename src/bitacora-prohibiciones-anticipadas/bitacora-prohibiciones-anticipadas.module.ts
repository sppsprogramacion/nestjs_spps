import { Module } from '@nestjs/common';
import { BitacoraProhibicionesAnticipadasService } from './bitacora-prohibiciones-anticipadas.service';
import { BitacoraProhibicionesAnticipadasController } from './bitacora-prohibiciones-anticipadas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BitacoraProhibicionAnticipada } from './entities/bitacora-prohibiciones-anticipada.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        BitacoraProhibicionAnticipada
      ])
    ],
  controllers: [BitacoraProhibicionesAnticipadasController],
  providers: [BitacoraProhibicionesAnticipadasService]
})
export class BitacoraProhibicionesAnticipadasModule {}
