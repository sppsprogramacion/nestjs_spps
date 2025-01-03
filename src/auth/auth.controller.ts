import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, ParseIntPipe, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginCiudadanoDto } from './dto/login-ciudadano.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}  

  @Post('login-ciudadano')
  async loginCiudadano(
    @Body()
    loginUsuarioDto: LoginUsuarioDto

  ) {
    return this.authService.loginUsuario(loginUsuarioDto,"ciudadano");
    
  }

  @Post('login-restriccion')
  async loginRestriccion(
    @Body()
    loginUsuarioDto: LoginUsuarioDto

  ) {
    return this.authService.loginUsuario(loginUsuarioDto,"restriccion");
    
  }

  @Post('login-judiciales')
  async loginJudiciales(
    @Body()
    loginUsuarioDto: LoginUsuarioDto

  ) {
    return this.authService.loginUsuario(loginUsuarioDto,"judiciales");
    
  }

  @Post('login-visitas')
  async loginVisitas(
    @Body()
    loginUsuarioDto: LoginUsuarioDto

  ) {
    return this.authService.loginUsuario(loginUsuarioDto,"visitas");
    
  }



  
}
