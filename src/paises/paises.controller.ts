import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { CreatePaiseDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';

@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  create(@Body() data: CreatePaiseDto) {
    return this.paisesService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.paisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    
    return this.paisesService.findOne(id);
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
    @Body() dataDto: UpdatePaiseDto
  ) {
    
    return this.paisesService.update(id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.paisesService.remove(id);
  }
}
