import { Module } from '@nestjs/common';
import { VisitasInternosService } from './visitas-internos.service';
import { VisitasInternosController } from './visitas-internos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitaInterno } from './entities/visitas-interno.entity';
import { NovedadCiudadano } from 'src/novedades-ciudadano/entities/novedades-ciudadano.entity';
import { NovedadesCiudadanoService } from 'src/novedades-ciudadano/novedades-ciudadano.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      VisitaInterno,
      NovedadCiudadano
    ])
  ],
  controllers: [VisitasInternosController],
  providers: [VisitasInternosService, NovedadesCiudadanoService]
})
export class VisitasInternosModule {}
