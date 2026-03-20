import { forwardRef, Module } from '@nestjs/common';
import { HistorialProcesalService } from './historial-procesal.service';
import { HistorialProcesalController } from './historial-procesal.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialProcesal } from './entities/historial-procesal.entity';
import { IngresosInternoModule } from 'src/ingresos-interno/ingresos-interno.module';

@Module({
  imports: [
    AuthModule,
    forwardRef(() => IngresosInternoModule),
    TypeOrmModule.forFeature([
      HistorialProcesal
    ])
  ],
  controllers: [HistorialProcesalController],
  providers: [HistorialProcesalService]
})
export class HistorialProcesalModule {}
