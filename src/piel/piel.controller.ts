import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { PielService } from './piel.service';
import { CreatePielDto } from './dto/create-piel.dto';
import { UpdatePielDto } from './dto/update-piel.dto';

@Controller('piel')
export class PielController {
  constructor(private readonly pielService: PielService) {}

  @Post()
  create(@Body() data: CreatePielDto) {
    return this.pielService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.pielService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    return this.pielService.findOne(id);
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
    @Body() dataDto: UpdatePielDto
  ) {

    return this.pielService.update(id, dataDto);
  }
}
