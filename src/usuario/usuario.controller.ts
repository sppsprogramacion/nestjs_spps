import { Controller, Get, Post, Body, Param, Delete, Req, NotFoundException, Put, Patch, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateUsuarioPassDto } from './dto/update-usuario-pass.dto';
import { Usuario } from './entities/usuario.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Auth(ValidRoles.superAdmin)
  create(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.create(data);
  }
  

  @Get('activos')
  @Auth(ValidRoles.superAdmin)
  findActivos(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {

    return this.usuarioService.findUsuariosActivos(true);
  }

  @Get('inactivos')
  @Auth(ValidRoles.superAdmin)
  findAll(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {

    return this.usuarioService.findUsuariosActivos(false);
  }
  
  @Get('mi-cuenta')
  @Auth()
  findOneToken(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {    
    
    return this.usuarioService.findOne(user.id_usuario);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string
  ) {    
    
    return this.usuarioService.findOne(+id);
  }


  @Patch('cambiar-password/:id')
  updatePassword(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataPasswordDto: UpdateUsuarioPassDto
  ) {
    
    return this.usuarioService.updatePassword(+id, dataPasswordDto);

  }

  @Patch('cambiar-mi-password')
  @Auth()
  updateMiPassword(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() dataPasswordDto: UpdateUsuarioPassDto
  ) {
    
    return this.usuarioService.updatePassword(user.id_usuario, dataPasswordDto);

  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateUsuarioDto
  ) {
    
    return this.usuarioService.update(+id, dataDto);
  }  

  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    if(isNaN(Number(dni))) throw new NotFoundException("El dni debe ser un número.")
    let dnix: number = parseFloat(dni);
    if(!Number.isInteger(dnix)) throw new NotFoundException("El dni debe ser un número entero.")
    return this.usuarioService.remove(dnix);
  }
}
