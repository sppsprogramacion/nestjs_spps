import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';

import { CreateParentescosMenoreDto } from './dto/create-parentescos-menore.dto';
import { ParentescosMenoresService } from './parentescos-menores.service';
import { UpdateParentescosMenoreDto } from './dto/update-parentescos-menore.dto';

@Controller('parentescos-menores')
export class ParentescosMenoresController {
  constructor(private readonly parentescosMenoresService: ParentescosMenoresService) {}

  @Post()
  create(@Body() data: CreateParentescosMenoreDto) {
    return this.parentescosMenoresService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.parentescosMenoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    return this.parentescosMenoresService.findOne(id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() dataDto: UpdateParentescosMenoreDto
  ) {

    return this.parentescosMenoresService.update(id, dataDto);
  }
}
