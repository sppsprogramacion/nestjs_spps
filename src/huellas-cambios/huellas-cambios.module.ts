import { Module } from '@nestjs/common';
import { HuellasCambiosService } from './huellas-cambios.service';
import { HuellasCambiosController } from './huellas-cambios.controller';

@Module({
  controllers: [HuellasCambiosController],
  providers: [HuellasCambiosService]
})
export class HuellasCambiosModule {}
