import { Module } from '@nestjs/common';
import { NovedadesCiudadanoService } from './novedades-ciudadano.service';
import { NovedadesCiudadanoController } from './novedades-ciudadano.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NovedadCiudadano } from './entities/novedades-ciudadano.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NovedadCiudadano
    ])
  ],
  controllers: [NovedadesCiudadanoController],
  providers: [NovedadesCiudadanoService]
})
export class NovedadesCiudadanoModule {}
