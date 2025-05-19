import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { BitacoraProhibicionesAnticipadasService } from './bitacora-prohibiciones-anticipadas.service';
import { CreateBitacoraProhibicionesAnticipadaDto } from './dto/create-bitacora-prohibiciones-anticipada.dto';
import { UpdateBitacoraProhibicionesAnticipadaDto } from './dto/update-bitacora-prohibiciones-anticipada.dto';

@Controller('bitacora-prohibiciones-anticipadas')
export class BitacoraProhibicionesAnticipadasController {
  constructor(private readonly bitacoraProhibicionesAnticipadasService: BitacoraProhibicionesAnticipadasService) {}

  //BUSCAR  XID PROHIBICION ANTICIPADA
    @Get('buscar-xprohibicion')  
    async findXProhibicion(
      @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string    
    ) {    
      
      return this.bitacoraProhibicionesAnticipadasService.findListaXProhibicionAnticipada(+id_prohibicion);
    }
    //FIN BUSCAR  XID PROHIBICION ANTICIPADA....................................................
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.bitacoraProhibicionesAnticipadasService.findOne(+id);
    }
}
