import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { CategoriasCiudadanoService } from './categorias-ciudadano.service';
import { CreateCategoriasCiudadanoDto } from './dto/create-categorias-ciudadano.dto';
import { UpdateCategoriasCiudadanoDto } from './dto/update-categorias-ciudadano.dto';

@Controller('categorias-ciudadano')
export class CategoriasCiudadanoController {
  constructor(private readonly categoriasCiudadanoService: CategoriasCiudadanoService) {}

  @Post()
  create(@Body() data: CreateCategoriasCiudadanoDto) {
    return this.categoriasCiudadanoService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.categoriasCiudadanoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.categoriasCiudadanoService.findOne(+id);
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
    @Body() dataDto: UpdateCategoriasCiudadanoDto
  ) {

    return this.categoriasCiudadanoService.update(+id, dataDto);
  }

}
