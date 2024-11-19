import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario
    ])
  ],
  exports: [UsuarioService],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
