import { Module } from '@nestjs/common';
import { ProhibicionesAnticipadasService } from './prohibiciones-anticipadas.service';
import { ProhibicionesAnticipadasController } from './prohibiciones-anticipadas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProhibicionAnticipada } from './entities/prohibiciones-anticipada.entity';
import { BitacoraProhibicionAnticipada } from '../bitacora-prohibiciones-anticipadas/entities/bitacora-prohibiciones-anticipada.entity';
import { BitacoraProhibicionesAnticipadasService } from 'src/bitacora-prohibiciones-anticipadas/bitacora-prohibiciones-anticipadas.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ProhibicionAnticipada,
      BitacoraProhibicionAnticipada
    ])
  ],
  controllers: [ProhibicionesAnticipadasController],
  providers: [ProhibicionesAnticipadasService, BitacoraProhibicionesAnticipadasService]
})
export class ProhibicionesAnticipadasModule {}
