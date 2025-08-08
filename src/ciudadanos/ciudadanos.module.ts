import { Module } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CiudadanosController } from './ciudadanos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudadano } from './entities/ciudadano.entity';
import { NovedadCiudadano } from 'src/novedades-ciudadano/entities/novedades-ciudadano.entity';
import { NovedadesCiudadanoService } from 'src/novedades-ciudadano/novedades-ciudadano.service';
import { DomicilioCiudadano } from 'src/domicilios-ciudadano/entities/domicilios-ciudadano.entity';
import { BitacoraCiudadano } from 'src/bitacora-ciudadano/entities/bitacora-ciudadano.entity';
import { BitacoraCiudadanoService } from 'src/bitacora-ciudadano/bitacora-ciudadano.service';
import { DomiciliosCiudadanoService } from 'src/domicilios-ciudadano/domicilios-ciudadano.service';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Ciudadano,
      BitacoraCiudadano,
      DomicilioCiudadano,
      NovedadCiudadano
    ])
  ],
  controllers: [CiudadanosController],
  providers: [CiudadanosService, BitacoraCiudadanoService, DomiciliosCiudadanoService, DriveImagenesService, NovedadesCiudadanoService]
})
export class CiudadanosModule {}
