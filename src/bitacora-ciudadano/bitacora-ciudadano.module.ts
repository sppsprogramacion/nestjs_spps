import { Module } from '@nestjs/common';
import { BitacoraCiudadanoService } from './bitacora-ciudadano.service';
import { BitacoraCiudadanoController } from './bitacora-ciudadano.controller';

@Module({
  controllers: [BitacoraCiudadanoController],
  providers: [BitacoraCiudadanoService]
})
export class BitacoraCiudadanoModule {}
