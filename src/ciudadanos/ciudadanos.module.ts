import { Module } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanosController } from './ciudadanos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudadano } from './entities/ciudadano.entity';
import { NovedadCiudadano } from 'src/novedades-ciudadano/entities/novedades-ciudadano.entity';
import { NovedadesCiudadanoService } from 'src/novedades-ciudadano/novedades-ciudadano.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ciudadano,
      NovedadCiudadano
    ])
  ],
  controllers: [CiudadanosController],
  providers: [CiudadanosService, NovedadesCiudadanoService]
})
export class CiudadanosModule {}
