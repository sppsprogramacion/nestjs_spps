import { Module } from '@nestjs/common';
import { NivelesEducacionService } from './niveles-educacion.service';
import { NivelesEducacionController } from './niveles-educacion.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelEducacion } from './entities/niveles-educacion.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      NivelEducacion
    ])
  ],
  controllers: [NivelesEducacionController],
  providers: [NivelesEducacionService]
})
export class NivelesEducacionModule {}
