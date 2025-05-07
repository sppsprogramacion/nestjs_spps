import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { NovedadesCiudadanoService } from './novedades-ciudadano.service';
import { CreateNovedadesCiudadanoDto } from './dto/create-novedades-ciudadano.dto';
import { UpdateNovedadesCiudadanoDto } from './dto/update-novedades-ciudadano.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Auth, GetUser } from 'src/auth/decorators';

@Controller('novedades-ciudadano')
export class NovedadesCiudadanoController {
  constructor(private readonly novedadesCiudadanoService: NovedadesCiudadanoService) {}

  
  @Post()
  @Auth()
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @GetUser("sistema") sistema: string,
    @Body() data: CreateNovedadesCiudadanoDto
  ) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = user.id_usuario;
    usuariox.organismo_id = user.organismo_id;
    
    return this.novedadesCiudadanoService.createDesdeController(data, usuariox, sistema);
  }  

  //BUSCAR  XID PCIUDADANO
  @Get('lista-xciudadano')  
  async findXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.novedadesCiudadanoService.findXCiudadano(+id_ciudadano);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.novedadesCiudadanoService.findOne(+id);
  }
}
