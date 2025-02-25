import { Module } from '@nestjs/common';
import { MenoresACargoService } from './menores_a_cargo.service';
import { MenoresACargoController } from './menores_a_cargo.controller';

@Module({
  controllers: [MenoresACargoController],
  providers: [MenoresACargoService]
})
export class MenoresACargoModule {}
