import { Module } from '@nestjs/common';
import { UsuariosRolService } from './usuarios-rol.service';
import { UsuariosRolController } from './usuarios-rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRol } from './entities/usuarios-rol.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioRol
    ])
  ],
  controllers: [UsuariosRolController],
  providers: [UsuariosRolService]
})
export class UsuariosRolModule {}
