import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { ProhibicionesVisitaService } from './prohibiciones-visita.service';
import { CreateProhibicionesVisitaDto } from './dto/create-prohibiciones-visita.dto';
import { UpdateProhibicionesVisitaDto } from './dto/update-prohibiciones-visita.dto';
import { LevantarManualProhibicionesVisitaDto } from './dto/levantar-manual-prohibiciones-visita.dto';
import { AnularProhibicionesVisitaDto } from './dto/anular-prohibiciones-visita.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('prohibiciones-visita')
export class ProhibicionesVisitaController {
  constructor(private readonly prohibicionesVisitaService: ProhibicionesVisitaService) {}

  @Post()
  create(@Body() data: CreateProhibicionesVisitaDto) {
    
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.prohibicionesVisitaService.create(data, usuariox);
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
  @Put('levantar-manual')
  updateLevantarManual(
    @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
    @Body() dataDto: LevantarManualProhibicionesVisitaDto
  ) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.prohibicionesVisitaService.levantarYProhibirManualmente(+id_prohibicion, dataDto, "levantar", usuariox);
  }
  //FIN LEVANTAMIENTO MANUAL.................................

  //PROHIBIR MANUAL
  @Put('prohibir-manual')
  updateProhibirManual(
    @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
    @Body() dataDto: LevantarManualProhibicionesVisitaDto
  ) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.prohibicionesVisitaService.levantarYProhibirManualmente(+id_prohibicion, dataDto, "prohibir", usuariox);
  }
  //FIN PROHIBIR MANUAL.................................

  //ANULAR PROHIBICION
  @Put('anular')
  updateAnular(
    @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
    @Body() dataDto: AnularProhibicionesVisitaDto
  ) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.prohibicionesVisitaService.anularProhibicion(+id_prohibicion, dataDto, usuariox);
  }
  //FIN ANULAR PROHIBICION.................................

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateProhibicionesVisitaDto
  ) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.prohibicionesVisitaService.update(+id, dataDto, usuariox);
  }


}
