import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { BitacoraCiudadanoService } from './bitacora-ciudadano.service';
import { BitacoraCiudadano } from './entities/bitacora-ciudadano.entity';

@Controller('bitacora-ciudadano')
export class BitacoraCiudadanoController {
  constructor(private readonly bitacoraCiudadanoService: BitacoraCiudadanoService) {}

  c//BUSCAR  XID CIUDADANO
  @Get('buscar-xprohibicion')  
  async findXProhibicion(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.bitacoraCiudadanoService.findXCiudadano(+id_ciudadano);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bitacoraCiudadanoService.findOne(+id);
  }
}
