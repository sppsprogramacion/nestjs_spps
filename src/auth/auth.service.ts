import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

import { LoginCiudadanoDto } from './dto/login-ciudadano.dto';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';


@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(Ciudadano)
    private readonly ciudadanoRepository: Repository<Ciudadano>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    private readonly jwtService: JwtService,
    
  ){}

  //LOGIN CIUDADANO
  async loginCiudadano(loginCiudadanoDto: LoginCiudadanoDto){
    const { dni, clave } = loginCiudadanoDto;   
    const ciudadano = await this.ciudadanoRepository.createQueryBuilder('ciudadano')
    .where('ciudadano.dni = :dni', { dni: dni })
    .select(['ciudadano', 'ciudadano.clave'])
    .getOne();
    
    if(!ciudadano)
      throw new UnauthorizedException ("Los datos de login no son válidos (dni)");

    
    //habilitar para login de ciudadano
    // if( !bcrypt.compareSync(clave, ciudadano.clave) )
    //   throw new UnauthorizedException ("Los datos de login no son válidos (clave)");

    //return ciudadano;
    return await this.ciudadanoRepository.findOneBy({dni: dni})
    //TODO: RETORNAR jWT
  }
  //FIN LOGIN CIUDADANO............................................................

  //LOGIN USUARIO
  async loginUsuario(loginUsuarioDto: LoginUsuarioDto, sistema:string){
    const { dni, clave } = loginUsuarioDto;    
    const usuario = await this.usuarioRepository.createQueryBuilder('usuario')
    .where('usuario.dni = :dni', { dni: dni })
    .select(['usuario.dni', 'usuario.clave', 'usuario.id_usuario'])
    .getOne();

    if(!usuario)
      throw new UnauthorizedException ("Los datos de login no son válidos (dni)");

    if( !bcrypt.compareSync(clave, usuario.clave) )
      throw new UnauthorizedException ("Los datos de login no son válidos (clave)");
    
    const usuario2 = await this.usuarioRepository.findOne(
      {
        relations: ['roles'],
        where: {dni: dni}
      }
    );
    
    //control de autorizacion del usuario en el sistema indicado
    const sistemasRoles = usuario2.roles.map((rolUsuario) => rolUsuario.rol.sistema_id)    
    if(!sistemasRoles.includes( sistema )){        
      throw new UnauthorizedException ("No está autorizado en este sistema");
    }

    //simplificacion de roles del usuario
    const {roles, ...usuarioData} = usuario2;


    return {
      ...usuarioData,
      roles: roles.map((rol) => rol.rol_id),
      //token: this.getJwtToken( {dni: usuario2.dni})
      token: this.getJwtToken( {id_usuario: usuario2.id_usuario} )
    };
    //TODO: RETORNAR jWT
  }
  //FIN LOGIN USUARIO.................................................................


  //VERIFICAR TOKEN
  
  //FIN VERIFICAR TOKEN

  //RETORNAR TOKEN
  private getJwtToken(payload: JwtPayload){
    const token = this.jwtService.sign(payload);

    return token
  }
  //FIN RETORNAR TOKEN..................................................
}
