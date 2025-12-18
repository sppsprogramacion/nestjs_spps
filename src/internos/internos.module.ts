import { Module } from '@nestjs/common';
import { InternosService } from './internos.service';
import { InternosController } from './internos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interno } from './entities/interno.entity';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';
import { AuthModule } from 'src/auth/auth.module';
import { IngresoInterno } from 'src/ingresos-interno/entities/ingresos-interno.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Interno,
      IngresoInterno
    ])
  ],
  controllers: [InternosController],
  providers: [InternosService, DriveImagenesService],
  exports: [InternosService]
})
export class InternosModule {}
