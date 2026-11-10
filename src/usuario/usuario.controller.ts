import { Controller, Get, Post, Body, Param, Delete, Req, NotFoundException, Put, Patch, ParseIntPipe, Query } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UpdateUsuarioPassDto } from './dto/update-usuario-pass.dto';
import { Usuario } from './entities/usuario.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { UpdateUsuarioMiPassDto } from './dto/update-usuario-mi-pass.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Auth(ValidRoles.superAdmin)
  create(@Body() data: CreateUsuarioDto) {
    return this.usuarioService.create(data);
  }
  

  //LISTA DE ACTIVOS
  @Get('lista-activos')
  @Auth(ValidRoles.superAdmin)
  findActivos(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {

    return this.usuarioService.findUsuariosActivos(true);
  }
  //FIN LISTA DE ACTIVOS
  //-------------------------------------------------------------------------------------

  //LISTA DE ACTIVOS X ORGANISMO PARA RESTRICCION DE VISITAS
  @Get('lista-activos-organismo-restriccion')
  @Auth(ValidRoles.superAdmin, ValidRoles.restriccionAdmin)
  findListaActivosOrganismoRestriccion(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {

    return this.usuarioService.findListaUsuariosActivosXOrganismoSistema(user, "restriccion");
  }
  //FIN LISTA DE ACTIVOS X ORGANISMO PARA RESTRICCION DE VISITAS
  //--------------------------------------------------------------------------------------

  //LISTA DE ACTIVOS X ORGANISMO PARA CIUDADANO
  @Get('lista-activos-organismo-ciudadano')
  @Auth(ValidRoles.superAdmin, ValidRoles.ciudadanoAdmin)
  findListaActivosOrganismoCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {

    return this.usuarioService.findListaUsuariosActivosXOrganismoSistema(user, "ciudadano");
  }
  //FIN LISTA DE ACTIVOS X ORGANISMO PARA CIUDADANO
  //--------------------------------------------------------------------------------------

  //LISTA DE ACTIVOS X ORGANISMO PARA JUDICIALES
  @Get('lista-activos-organismo-juduciales')
  @Auth(ValidRoles.superAdmin, ValidRoles.judicialAdmin)
  findListaActivosOrganismoJudiciales(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {

    return this.usuarioService.findListaUsuariosActivosXOrganismoSistema(user, "judicial");
  }
  //FIN LISTA DE ACTIVOS X ORGANISMO PARA JUDICIALES
  //--------------------------------------------------------------------------------------

  //LISTA DE INACTIVOS
  @Get('lista-inactivos')
  @Auth(ValidRoles.superAdmin)
  findListaInactivos(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {

    return this.usuarioService.findUsuariosActivos(false);
  }
  //FIN LISTA DE INACTIVOS
  //---------------------------------------------------------------------------------------

  
  //OBTENER DATOS DE MI CUENTA
  @Get('mi-cuenta')
  @Auth()
  findOneToken(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {    
    
    return this.usuarioService.findOne(user.id_usuario);
  }
  //FIN OBTENER DATOS DE MI CUENTA
  //--------------------------------------------------------------------------------------

  //OBTENER USUARIO X ID
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: string
  ) {    
    
    return this.usuarioService.findOne(+id);
  }
  //FIN OBTENER USUARIO X ID
  //-----------------------------------------------------------------------------------------

  //CAMBIAR PASSWORD DE UN USUARIO
  @Put('cambiar-password/:id')
  updatePassword(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataPasswordDto: UpdateUsuarioPassDto
  ) {
    
    return this.usuarioService.updatePassword(+id, dataPasswordDto);

  }
  //FIN CAMBIAR PASSWORD DE UN USUARIO
  //-------------------------------------------------------------------------------------------

  //CAMBIAR MI PASSWORD, el usuario cambia su propia paaword
  @Put('cambiar-mi-password')
  @Auth()
  updateMiPassword(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() dataMiPasswordDto: UpdateUsuarioMiPassDto
  ) {
    
    return this.usuarioService.updateMiPassword(dataMiPasswordDto, user);

  }
  //FIN CAMBIAR MI PASSWORD
  //--------------------------------------------------------------------------------------------

  //DESHABILITAR ROL DE USUARIO EN SISTEMA RESTRICCION
  @Put('deshabilitar-ensistema-restriccion')
  @Auth(ValidRoles.restriccionAdmin)
  updateDeshabilitarEnSistemaRestriccion(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
     @Query('idUsuario', ParseIntPipe) idUsuario: string,
  ) {
    
    return this.usuarioService.updateDeshabilitarRol(+idUsuario, "restriccion", user);

  }
  //FIN DESHABILITAR ROL DE USUARIO EN SISTEMA RESTRICCION
  //--------------------------------------------------------------------------------------------

  //DESHABILITAR ROL DE USUARIO EN SISTEMA CIUDADANO
  @Put('deshabilitar-ensistema-ciudadano')
  @Auth(ValidRoles.ciudadanoAdmin)
  updateDeshabilitarEnSistemaCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('idUsuario', ParseIntPipe) idUsuario: string,
  ) {
    
    return this.usuarioService.updateDeshabilitarRol(+idUsuario, "ciudadano", user);

  }
  //FIN DESHABILITAR ROL DE USUARIO EN SISTEMA CIUDADANO
  //--------------------------------------------------------------------------------------------

  //DESHABILITAR ROL DE USUARIO EN SISTEMA JUDICIALES
  @Put('deshabilitar-ensistema-judicial')
  @Auth(ValidRoles.ciudadanoAdmin)
  updateDeshabilitarEnSistemaJudiciales(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
     @Query('idUsuario', ParseIntPipe) idUsuario: string,
  ) {
    
    return this.usuarioService.updateDeshabilitarRol(+idUsuario, "judicial", user);

  }
  //FIN DESHABILITAR ROL DE USUARIO EN SISTEMA JUDICIALES
  //--------------------------------------------------------------------------------------------

  @Put(':id')
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
