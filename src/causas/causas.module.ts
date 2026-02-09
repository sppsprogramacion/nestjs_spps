import { Module } from '@nestjs/common';
import { CausasService } from './causas.service';
import { CausasController } from './causas.controller';

@Module({
  controllers: [CausasController],
  providers: [CausasService]
})
export class CausasModule {}
