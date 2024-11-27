import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ProhibicionesVisitaService } from './prohibiciones-visita.service';
import { CreateProhibicionesVisitaDto } from './dto/create-prohibiciones-visita.dto';
import { UpdateProhibicionesVisitaDto } from './dto/update-prohibiciones-visita.dto';
import { LevantarManualProhibicionesVisitaDto } from './dto/levantar-manual-prohibiciones-visita.dto';

@Controller('prohibiciones-visita')
export class ProhibicionesVisitaController {
  constructor(private readonly prohibicionesVisitaService: ProhibicionesVisitaService) {}

  @Post()
  create(@Body() data: CreateProhibicionesVisitaDto) {
    
    return this.prohibicionesVisitaService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.prohibicionesVisitaService.findAll();
  }

  //BUSCAR  XID CIUDADANO
  @Get('buscar-xciudadano')  
  async findXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string
    
  ) {    
    
    return this.prohibicionesVisitaService.findXCiudano(+id_ciudadano);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.prohibicionesVisitaService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...............................

  //LEVANTAMIENTO MANUAL
  @Patch('levantar-manual')
  updateLevantarManual(
    @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
    @Body() dataDto: LevantarManualProhibicionesVisitaDto
  ) {

    return this.prohibicionesVisitaService.levantarManualmente(+id_prohibicion, dataDto);
  }
  //FIN LEVANTAMIENTO MANUAL.................................

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateProhibicionesVisitaDto
  ) {

    return this.prohibicionesVisitaService.update(+id, dataDto);
  }


}
