import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, NotFoundException, Put } from '@nestjs/common';
import { AbogadosInternoService } from './abogados-interno.service';
import { CreateAbogadosInternoDto } from './dto/create-abogados-interno.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateQuitarVigenteDto } from './dto/update-quitar-vigente.dto';

@Controller('abogados-interno')
export class AbogadosInternoController {
  constructor(private readonly abogadosInternoService: AbogadosInternoService) {}

  @Post()
  create(@Body() data: CreateAbogadosInternoDto) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.apellido = "DIAZ";
    usuariox.nombre = "PEDRO";
    usuariox.organismo_id = 1;
    
    return this.abogadosInternoService.create(data, usuariox);
  }  

  //BUSCAR LISTA XID CIUDADANO
  @Get('lista-xciudadano')  
  async findXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.abogadosInternoService.findXCiudadano(+id_ciudadano);
  }
  //FIN BUSCAR  LISTA XID CIUDADANO....................................................

  //BUSCAR LISTA XID INTERNO
  @Get('lista-xinterno')  
  async findXInterno(
    @Query('id_interno', ParseIntPipe) interno: string    
  ) {    
    
    return this.abogadosInternoService.findXInterno(+interno);
  }
  //FIN BUSCAR  LISTA XID INTERNO....................................................

  //BUSCAR LISTA VIGENTES XID CIUDADANO
  @Get('lista-vigentes-xciudadano')  
  async findVigentesXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.abogadosInternoService.findVigentesXCiudadano(+id_ciudadano);
  }
  //FIN BUSCAR  LISTA VIGENTES XID CIUDADANO....................................................

  //BUSCAR LISTA VIGENTES XID INTERNO
  @Get('lista-vigentes-xinterno')  
  async findVigentesXInterno(
    @Query('id_interno', ParseIntPipe) id_interno: string    
  ) {    
    
    return this.abogadosInternoService.findVigentesXInterno(+id_interno);
  }
  //FIN BUSCAR  LISTA VIGENTES XID INTERNO....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.abogadosInternoService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  //QUITAR VIGENTE
  @Put('quitar-vigente')
  updateQuirarVigente(
    @Query('id_abogado_interno', ParseIntPipe) id_abogado_interno: string ,
    @Body() dataDto: UpdateQuitarVigenteDto
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.apellido = "DIAZ";
    usuariox.nombre = "PEDRO";
    usuariox.organismo_id = 1;

    return this.abogadosInternoService.quitarVigente(+id_abogado_interno, dataDto, usuariox);
  }
  //FIN QUITAR VIGENTE.................................

}
