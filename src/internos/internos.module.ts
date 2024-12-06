import { Module } from '@nestjs/common';
import { InternosService } from './internos.service';
import { InternosController } from './internos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interno } from './entities/interno.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Interno
    ])
  ],
  controllers: [InternosController],
  providers: [InternosService]
})
export class InternosModule {}
