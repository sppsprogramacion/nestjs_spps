import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put, Query } from '@nestjs/common';
import { CiudadanosCategoriasService } from './ciudadanos-categorias.service';
import { CreateCiudadanosCategoriaDto } from './dto/create-ciudadanos-categoria.dto';
import { UpdateCiudadanosCategoriaDto } from './dto/update-ciudadanos-categoria.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateAnularCategoriaDto } from './dto/update-anular-categoria.dto';

@Controller('ciudadanos-categorias')
export class CiudadanosCategoriasController {
  constructor(private readonly ciudadanosCategoriasService: CiudadanosCategoriasService) {}

  @Post()
  create(@Body() data: CreateCiudadanosCategoriaDto) {
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.apellido = "DIAZ";
    usuariox.nombre = "PEDRO";
    usuariox.organismo_id = 1;
    
    return this.ciudadanosCategoriasService.create(data, usuariox);
  }  

  @Get('todos')
  findAll() {
    return this.ciudadanosCategoriasService.findAll();
  }

  //BUSCAR LISTA XID CIUDADANO
  @Get('lista-xciudadano')  
  async findXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.ciudadanosCategoriasService.findXCiudadano(+id_ciudadano);
  }
  //FIN BUSCAR  LISTA XID CIUDADANO....................................................

  //BUSCAR LISTA VIGENTES XID CIUDADANO
  @Get('lista-vigentes-xciudadano')  
  async findVigentesXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.ciudadanosCategoriasService.findVigentesXCiudadano(+id_ciudadano);
  }
  //FIN BUSCAR  LISTA VIGENTES XID CIUDADANO....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.ciudadanosCategoriasService.findOne(+id);
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
    @Query('id_ciudadano_categoria', ParseIntPipe) id_ciudadano_categoria: string ,
    @Body() dataDto: UpdateAnularCategoriaDto
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.apellido = "DIAZ";
    usuariox.nombre = "PEDRO";
    usuariox.organismo_id = 1;

    return this.ciudadanosCategoriasService.quitarVigente(+id_ciudadano_categoria, dataDto, usuariox);
  }
  //FIN QUITAR VIGENTE.................................

  
}
