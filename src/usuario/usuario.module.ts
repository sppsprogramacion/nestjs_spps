import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule, //aqui se importa para ser usado en la JwtStrategy - jwt-strategy
    AuthModule,    
    TypeOrmModule.forFeature([
      Usuario
    ])
  ],
  exports: [UsuarioService],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
