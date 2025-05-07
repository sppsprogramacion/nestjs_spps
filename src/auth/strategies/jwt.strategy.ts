import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from '@nestjs/typeorm';

import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Repository } from 'typeorm';

@Injectable() //se lo decora con injectable porque es un provider (servicio)
export class JwtStrategy extends PassportStrategy( Strategy) {

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,

        configService: ConfigService
    ){

        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    
    // async validate(payload: JwtPayload):Promise<Usuario> {
        
    //     const { id_usuario } = payload;

    //     const usuario = await this.usuarioRepository.findOneBy ({id_usuario});

    //     if (!usuario) 
    //         throw new UnauthorizedException('Token no es valido.')

    //     if (!usuario.activo)
    //         throw new UnauthorizedException('El usuario esta inactivo')


    //     return usuario;

    // }

    async validate(payload: JwtPayload) {
        
        const { id_usuario } = payload;
        const { sistema } = payload;

        const usuario = await this.usuarioRepository.findOneBy ({id_usuario});

        if (!usuario) 
            throw new UnauthorizedException('Token no es valido.')

        if (!usuario.activo)
            throw new UnauthorizedException('El usuario esta inactivo')


        return {usuario,sistema};

    }
}