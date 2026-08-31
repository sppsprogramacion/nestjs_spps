import { Module } from '@nestjs/common';
import { HuellasService } from './huellas.service';
import { HuellasController } from './huellas.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Huella } from './entities/huella.entity';
import { DedoHuella } from 'src/dedos_huella/entities/dedos_huella.entity';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Huella,
      Ciudadano,
      DedoHuella
    ])
  ],
  controllers: [HuellasController],
  providers: [HuellasService]
})
export class HuellasModule {}
