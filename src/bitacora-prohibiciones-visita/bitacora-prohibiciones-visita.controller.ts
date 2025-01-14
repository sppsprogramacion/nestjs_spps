import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { BitacoraProhibicionesVisitaService } from './bitacora-prohibiciones-visita.service';

@Controller('bitacora-prohibiciones-visita')
export class BitacoraProhibicionesVisitaController {
  constructor(private readonly bitacoraProhibicionesVisitaService: BitacoraProhibicionesVisitaService) {}
  

  //BUSCAR  XID PROHIBICION
  @Get('buscar-xprohibicion')  
  async findXProhibicion(
    @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string    
  ) {    
    
    return this.bitacoraProhibicionesVisitaService.findXProhibicionVisita(+id_prohibicion);
  }
  //FIN BUSCAR  XID PROHIBICION....................................................

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bitacoraProhibicionesVisitaService.findOne(+id);
  }
  
}
