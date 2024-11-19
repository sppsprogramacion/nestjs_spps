import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProvinciasService } from './provincias.service';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';

@Controller('provincias')
export class ProvinciasController {
  constructor(private readonly provinciasService: ProvinciasService) {}

  @Post()
  create(@Body() data: CreateProvinciaDto) {
    return this.provinciasService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.provinciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    
    return this.provinciasService.findOne(id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() dataDto: UpdateProvinciaDto
  ) {
    
    return this.provinciasService.update(id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.provinciasService.remove(id);
  }
}
