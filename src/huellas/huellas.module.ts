import { Module } from '@nestjs/common';
import { HuellasService } from './huellas.service';
import { HuellasController } from './huellas.controller';

@Module({
  controllers: [HuellasController],
  providers: [HuellasService]
})
export class HuellasModule {}
