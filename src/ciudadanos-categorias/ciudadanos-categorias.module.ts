import { Module } from '@nestjs/common';
import { CiudadanosCategoriasService } from './ciudadanos-categorias.service';
import { CiudadanosCategoriasController } from './ciudadanos-categorias.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadanoCategoria } from './entities/ciudadanos-categoria.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      CiudadanoCategoria
    ])
  ],
  controllers: [CiudadanosCategoriasController],
  providers: [CiudadanosCategoriasService]
})
export class CiudadanosCategoriasModule {}
