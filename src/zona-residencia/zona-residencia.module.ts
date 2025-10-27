import { Module } from '@nestjs/common';
import { ZonaResidenciaService } from './zona-residencia.service';
import { ZonaResidenciaController } from './zona-residencia.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonaResidencia } from './entities/zona-residencia.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      ZonaResidencia
    ])
  ],
  controllers: [ZonaResidenciaController],
  providers: [ZonaResidenciaService]
})
export class ZonaResidenciaModule {}
