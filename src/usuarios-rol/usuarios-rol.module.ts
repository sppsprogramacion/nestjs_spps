import { Module } from '@nestjs/common';
import { UsuariosRolService } from './usuarios-rol.service';
import { UsuariosRolController } from './usuarios-rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRol } from './entities/usuarios-rol.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,   
    TypeOrmModule.forFeature([
      UsuarioRol
    ])
  ],
  controllers: [UsuariosRolController],
  providers: [UsuariosRolService]
})
export class UsuariosRolModule {}
