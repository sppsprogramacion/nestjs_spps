import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { HuellasService } from './huellas.service';
import { CreateHuellaDto } from './dto/create-huella.dto';
import { UpdateHuellaDto } from './dto/update-huella.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('huellas')
export class HuellasController {
  constructor(private readonly huellasService: HuellasService) {}

  @Post()
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateHuellaDto
  ) {
    return this.huellasService.create(data, user);
  }  

  @Get('todos')
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  findAll(
     @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return this.huellasService.findAll();
  }

  @Get('/ciudadano/:id')
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async obtenerHuellasCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe) id: number,
  ) {

    return await this.huellasService.obtenerPorCiudadano(id);
  }

  @Get('sincronizacion-inicial')
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async sincronizacionInicial(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
  
      return await this.huellasService.sincronizacionInicial();
  }

  @Get('sincronizacion/:version')
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async sincronizacion(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('version') version: string
  ) {

      return await this.huellasService.sincronizacion(version);
  }

  @Get(':id')
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  findOne(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe) id: string
  ) {    
    
    return this.huellasService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Delete('quitar-huella/:id')
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async quitarHuella(
      @Param('id', ParseIntPipe) id: number,
      @GetUser('usuario') user: Usuario,
  ) {
      return await this.huellasService.quitarHuellas(id, user);
  }

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: string, 
  //   @Body() dataDto: UpdateHuellaDto
  // ) {

  //   return this.huellasService.update(+id, dataDto);
  // }


}
