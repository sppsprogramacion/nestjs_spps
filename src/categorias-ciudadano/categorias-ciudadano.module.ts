import { Module } from '@nestjs/common';
import { CategoriasCiudadanoService } from './categorias-ciudadano.service';
import { CategoriasCiudadanoController } from './categorias-ciudadano.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaCiudadano } from './entities/categorias-ciudadano.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      CategoriaCiudadano
    ])
  ],
  controllers: [CategoriasCiudadanoController],
  providers: [CategoriasCiudadanoService]
})
export class CategoriasCiudadanoModule {}
