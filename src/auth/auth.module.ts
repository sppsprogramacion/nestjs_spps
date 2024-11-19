import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { CiudadanosModule } from '../ciudadanos/ciudadanos.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule, //aqui se importa para ser usado en la JwtStrategy - jwt-strategy

    TypeOrmModule.forFeature([
      Ciudadano,
      Usuario
    ]),

    //configuracion para jwt - JwtModule.registerAsync IMPORTAR ConfigModule LUEGO INJECTAR ConfigService para usar configService en useFactory
    PassportModule.register({defaultStrategy: 'jwt'}),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],

      useFactory: (configService: ConfigService) => {
        //console.log("jwtConfig", configService.get('JWT_SECRET'));
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h',
          }
        }
      }

      //fin configuracion para jwt
      
    })
    
    // UsuarioModule,
    // CiudadanosModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
