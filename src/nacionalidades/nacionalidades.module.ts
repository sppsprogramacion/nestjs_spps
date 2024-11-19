import { Module } from '@nestjs/common';
import { NacionalidadesService } from './nacionalidades.service';
import { NacionalidadesController } from './nacionalidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nacionalidad } from './entities/nacionalidad.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Nacionalidad
    ])
  ],
  controllers: [NacionalidadesController],
  providers: [NacionalidadesService]
})
export class NacionalidadesModule {}
