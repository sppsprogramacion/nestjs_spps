import { forwardRef, Module } from '@nestjs/common';
import { IngresosInternoService } from './ingresos-interno.service';
import { IngresosInternoController } from './ingresos-interno.controller';
import { IngresoInterno } from './entities/ingresos-interno.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrasladoInterno } from 'src/traslados-interno/entities/traslados-interno.entity';
import { TrasladosInternoModule } from 'src/traslados-interno/traslados-interno.module';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';
import { HistorialProcesal } from 'src/historial-procesal/entities/historial-procesal.entity';
import { HistorialProcesalModule } from 'src/historial-procesal/historial-procesal.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => TrasladosInternoModule),
    forwardRef(() => HistorialProcesalModule),
    TypeOrmModule.forFeature([
      IngresoInterno,
      HistorialProcesal,
      TrasladoInterno
    ])
  ],
  controllers: [IngresosInternoController],
  providers: [IngresosInternoService, DriveImagenesService],
  exports: [IngresosInternoService]
})
export class IngresosInternoModule {}
