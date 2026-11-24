import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { UsuariosRolService } from './usuarios-rol.service';
import { CreateUsuariosRolDto } from './dto/create-usuarios-rol.dto';
import { UpdateUsuariosRolDto } from './dto/update-usuarios-rol.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('usuarios-rol')
export class UsuariosRolController {
  constructor(private readonly usuariosRolService: UsuariosRolService) {}

  @Post()
  @Auth(ValidRoles.superAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateUsuariosRolDto
  ) {

    return this.usuariosRolService.create(data, user);
  }  

  // @Get('todos')
  // findAll() {
  //   return this.usuariosRolService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: string) {    
    
  //   return this.usuariosRolService.findOne(+id);
  // }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: string, 
  //   @Body() dataDto: UpdateUsuariosRolDto
  // ) {

  //   return this.usuariosRolService.update(+id, dataDto);
  // }

 
}
