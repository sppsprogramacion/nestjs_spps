import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { CiudadanosCategoriasService } from './ciudadanos-categorias.service';
import { CreateCiudadanosCategoriaDto } from './dto/create-ciudadanos-categoria.dto';
import { UpdateCiudadanosCategoriaDto } from './dto/update-ciudadanos-categoria.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateCiudadanosCategoriaDto
  ) {

    return this.ciudadanosCategoriasService.update(+id, dataDto);
  }
}
