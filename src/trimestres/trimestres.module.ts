import { Module } from '@nestjs/common';
import { TrimestresService } from './trimestres.service';
import { TrimestresController } from './trimestres.controller';

@Module({
  controllers: [TrimestresController],
  providers: [TrimestresService]
})
export class TrimestresModule {}
