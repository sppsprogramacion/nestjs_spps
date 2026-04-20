import { Module } from '@nestjs/common';
import { TrimestresService } from './trimestres.service';
import { TrimestresController } from './trimestres.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trimestre } from './entities/trimestre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Trimestre
    ])
  ],
  controllers: [TrimestresController],
  providers: [TrimestresService]
})
export class TrimestresModule {}
