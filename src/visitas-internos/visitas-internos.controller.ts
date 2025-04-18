import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put, Query } from '@nestjs/common';
import { VisitasInternosService } from './visitas-internos.service';
import { CreateVisitasInternoDto } from './dto/create-visitas-interno.dto';
import { DetalleCambioVisitasInternoDto } from './dto/detalle-cambio-visitas-interno.dto';
import { UpdateCambioParentescoDto } from './dto/update-cambio-parentesco.dto';

@Controller('visitas-internos')
export class VisitasInternosController {
  constructor(private readonly visitasInternosService: VisitasInternosService) {}

  @Post()
  create(@Body() data: CreateVisitasInternoDto) {
    return this.visitasInternosService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.visitasInternosService.findAll();
  }

  //BUSCAR  XID CIUDADANO
  @Get('buscarlista-xciudadano')  
  async findXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string
    
  ) {    
    
    return this.visitasInternosService.findXCiudano(+id_ciudadano);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  //BUSCAR  XID INTERNO
  @Get('buscarlista-xinterno')  
  async findXInterno(
    @Query('id_interno', ParseIntPipe) id_interno: string
    
  ) {    
    
    return this.visitasInternosService.findXInterno(+id_interno);
  }
  //FIN BUSCAR  XID INTERNO....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.visitasInternosService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  //CAMBIAR PARENTESCO
  @Put('cambiar-parentesco')
  updateCambiarParentesco(
    @Query('id_visita_interno', ParseIntPipe) id_visita_interno: string ,
    @Body() dataDto: UpdateCambioParentescoDto
  ) {

    return this.visitasInternosService.updateCambioParentesco(+id_visita_interno, dataDto);
  }
  //FIN CAMBIAR PARENTESCO.................................

  //ANULAR PARENTESCO
  @Put('anular-parentesco')
  updateAnularParentesco(
    @Query('id_visita_interno', ParseIntPipe) id_visita_interno: string ,
    @Body() dataDto: DetalleCambioVisitasInternoDto
  ) {

    return this.visitasInternosService.updateAnularParentesco(+id_visita_interno, dataDto);
  }
  //FIN ANULAR PARENTESCO.................................

  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.visitasInternosService.remove(+id);
  }
}
