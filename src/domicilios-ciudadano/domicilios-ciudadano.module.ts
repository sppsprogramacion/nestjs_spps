import { Module } from '@nestjs/common';
import { DomiciliosCiudadanoService } from './domicilios-ciudadano.service';
import { DomiciliosCiudadanoController } from './domicilios-ciudadano.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomicilioCiudadano } from './entities/domicilios-ciudadano.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DomicilioCiudadano
    ])
  ],
  controllers: [DomiciliosCiudadanoController],
  providers: [DomiciliosCiudadanoService]
})
export class DomiciliosCiudadanoModule {}
