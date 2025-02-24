import { Module } from '@nestjs/common';
import { InternosService } from './internos.service';
import { InternosController } from './internos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interno } from './entities/interno.entity';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Interno
    ])
  ],
  controllers: [InternosController],
  providers: [InternosService, DriveImagenesService]
})
export class InternosModule {}
