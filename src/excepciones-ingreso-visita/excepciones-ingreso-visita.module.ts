import { Module } from '@nestjs/common';
import { ExcepcionesIngresoVisitaService } from './excepciones-ingreso-visita.service';
import { ExcepcionesIngresoVisitaController } from './excepciones-ingreso-visita.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExcepcionIngresoVisita } from './entities/excepciones-ingreso-visita.entity';
import { InternosService } from 'src/internos/internos.service';
import { Interno } from 'src/internos/entities/interno.entity';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';
import { InternosModule } from 'src/internos/internos.module';

@Module({
  imports: [
    AuthModule,
    InternosModule,
    TypeOrmModule.forFeature([
      ExcepcionIngresoVisita,
      Interno
    ])
  ],
  controllers: [ExcepcionesIngresoVisitaController],
  providers: [ExcepcionesIngresoVisitaService, DriveImagenesService]
})
export class ExcepcionesIngresoVisitaModule {}
