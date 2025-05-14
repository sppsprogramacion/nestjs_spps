import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put, Query } from '@nestjs/common';
import { VisitasInternosService } from './visitas-internos.service';
import { CreateVisitasInternoDto } from './dto/create-visitas-interno.dto';
import { DetalleCambioVisitasInternoDto } from './dto/detalle-cambio-visitas-interno.dto';
import { UpdateCambioParentescoDto } from './dto/update-cambio-parentesco.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateProhibirParentescoDto } from './dto/update-prohibir-parentesco.dto';
import { UpdateLevantarProhibicionParentescoDto } from './dto/update-levantar-prohibicion-parentesco.dto';
import { UpdateVigenciaParentescoDto } from './dto/update-vigencia-parentesco.dto';
import { Auth, GetUser } from 'src/auth/decorators';

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
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.visitasInternosService.updateCambioParentesco(+id_visita_interno, dataDto, usuariox);
  }
  //FIN CAMBIAR PARENTESCO.................................

  //PROHIBIR PARENTESCO
  @Put('prohibir-parentesco')
  updateProhibirParentesco(
    @Query('id_visita_interno', ParseIntPipe) id_visita_interno: string ,
    @Body() dataDto: UpdateProhibirParentescoDto
  ) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.visitasInternosService.updateProhibicionParentesco(+id_visita_interno, dataDto, usuariox);
  }
  //FIN PROHIBIR PARENTESCO.................................

  //LEVANTAR PROHIBICION PARENTESCO
  @Put('levantar-prohibicion-parentesco')
  updateLevantarProhibicionParentesco(
    @Query('id_visita_interno', ParseIntPipe) id_visita_interno: string ,
    @Body() dataDto: UpdateLevantarProhibicionParentescoDto
  ) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.visitasInternosService.updateLevantarProhibicionParentesco(+id_visita_interno, dataDto, usuariox);
  }
  //FIN LEVANTAR PROHIBICION PARENTESCO.................................

  //ANULAR PARENTESCO
  @Put('anular-parentesco')
  updateAnularParentesco(
    @Query('id_visita_interno', ParseIntPipe) id_visita_interno: string ,
    @Body() dataDto: DetalleCambioVisitasInternoDto
  ) {

    return this.visitasInternosService.updateAnularParentesco(+id_visita_interno, dataDto);
  }
  //FIN ANULAR PARENTESCO.................................

  //REVINCULAR PARENTESCO
  @Put('revincular-parentesco')
  @Auth()
  updateRevinculacionParentesco(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_visita_interno', ParseIntPipe) id_visita_interno: string ,
    @Body() dataDto: UpdateVigenciaParentescoDto
  ) {
    
    return this.visitasInternosService.updateRevincualarParentesco(+id_visita_interno, dataDto, user);
  }
  //FIN REVINCULAR PARENTESCO.................................


  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.visitasInternosService.remove(+id);
  }
}
