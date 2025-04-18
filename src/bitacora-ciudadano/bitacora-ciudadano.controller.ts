import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { BitacoraCiudadanoService } from './bitacora-ciudadano.service';

@Controller('bitacora-ciudadano')
export class BitacoraCiudadanoController {
  constructor(private readonly bitacoraCiudadanoService: BitacoraCiudadanoService) {}

  //BUSCAR  XID CIUDADANO
  @Get('buscar-xciudadano')  
  async findXCiudadano(
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
