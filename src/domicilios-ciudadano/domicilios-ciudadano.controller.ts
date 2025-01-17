import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { DomiciliosCiudadanoService } from './domicilios-ciudadano.service';

@Controller('domicilios-ciudadano')
export class DomiciliosCiudadanoController {
  constructor(private readonly domiciliosCiudadanoService: DomiciliosCiudadanoService) {}

  //BUSCAR  XID CIUDADANO
  @Get('buscar-xciudadano')  
  async findXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.domiciliosCiudadanoService.findXCiudadano(+id_ciudadano);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domiciliosCiudadanoService.findOne(+id);
  }
}
