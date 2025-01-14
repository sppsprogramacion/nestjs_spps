import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { NovedadesCiudadanoService } from './novedades-ciudadano.service';
import { CreateNovedadesCiudadanoDto } from './dto/create-novedades-ciudadano.dto';
import { UpdateNovedadesCiudadanoDto } from './dto/update-novedades-ciudadano.dto';

@Controller('novedades-ciudadano')
export class NovedadesCiudadanoController {
  constructor(private readonly novedadesCiudadanoService: NovedadesCiudadanoService) {}

  
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
