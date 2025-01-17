import { Module } from '@nestjs/common';
import { BitacoraCiudadanoService } from './bitacora-ciudadano.service';
import { BitacoraCiudadanoController } from './bitacora-ciudadano.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BitacoraCiudadano } from './entities/bitacora-ciudadano.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BitacoraCiudadano
    ])
  ],
  controllers: [BitacoraCiudadanoController],
  providers: [BitacoraCiudadanoService]
})
export class BitacoraCiudadanoModule {}
