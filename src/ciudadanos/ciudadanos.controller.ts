import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Query, Put } from '@nestjs/common';
import { CiudadanosService } from './ciudadanos.service';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { EstablecerVisitaDto } from './dto/establecer-visita.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { EstablecerComoVisitaDto } from './dto/establecer-como-visita.dto';

@Controller('ciudadanos')
export class CiudadanosController {
  constructor(private readonly ciudadanosService: CiudadanosService) {}

  @Post()
  create(@Body() createCiudadanoDto: CreateCiudadanoDto) {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    createCiudadanoDto.fecha_alta = fecha_actual;  
    createCiudadanoDto.foto = "foto-" + createCiudadanoDto.dni.toString();

    return this.ciudadanosService.create(createCiudadanoDto);
  }

  @Get('todos')
  findAll() {
    return this.ciudadanosService.findAll();
  }

  //BUSCAR CIUDADANO X DNI
  @Get('buscar-xdni')  
  async findCiudadanoXDni(
    @Query('dni', ParseIntPipe) dni: string, 
  ) {    
    
    return this.ciudadanosService.findXDni(+dni);
  }
  //FIN BUSCAR CIUDADANO X DNI...........................................

  //BUSCAR LISTA X DNI
  @Get('buscarlista-xdni')  
  async findListaXDni(
    @Query('dni', ParseIntPipe) dni: string, 
  ) {    
    
    return this.ciudadanosService.findListaXDni(+dni);
  }
  //FIN BUSCAR LISTA X DNI...........................................

  //BUSCAR LISTA X APELLIDO
  @Get('buscarlista-xapellido')  
  async findListaXApellido(
    @Query('apellido') apellido: string, 
  ) {    
        
    return this.ciudadanosService.findListaXApellido(apellido);
  }
  //FIN BUSCAR LISTA X APELLIDO...........................................

  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id_ciudadano: string) {
    return this.ciudadanosService.findOne(+id_ciudadano);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  //ESTABLECER ESTADO COMO VISITA
  @Put('establecer-visita')
  updateEstablecerComoVisita(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,
    @Body() dataDto: EstablecerVisitaDto
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;
    
    return this.ciudadanosService.establecerComoVisita(+id_ciudadano, dataDto, true, usuariox);
  }
  //FIN ESTABLECER ESTADO COMO VISITA.................................  

  //QUITAR ESTADO COMO VISITA
  @Put('quitar-visita')
  updateQuitarComoVisita(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string ,
    @Body() dataDto: EstablecerVisitaDto
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.ciudadanosService.establecerComoVisita(+id_ciudadano, dataDto, false, usuariox);
  }
  //FIN QUITAR ESTADO COMO VISITA.................................

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCiudadanoDto: UpdateCiudadanoDto) {
    return this.ciudadanosService.update(+id, updateCiudadanoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadanosService.remove(+id);
  }
}
