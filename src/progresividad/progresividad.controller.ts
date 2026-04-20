import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Put } from '@nestjs/common';
import { ProgresividadService } from './progresividad.service';
import { CreateProgresividadDto } from './dto/create-progresividad.dto';
import { UpdateProgresividadDto } from './dto/update-progresividad.dto';

@Controller('progresividad')
export class ProgresividadController {
  constructor(private readonly progresividadService: ProgresividadService) {}

  @Post()
  create(@Body() data: CreateProgresividadDto) {
    return this.progresividadService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.progresividadService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.progresividadService.findOne(+id);
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
    @Body() dataDto: UpdateProgresividadDto
  ) {

    return this.progresividadService.update(+id, dataDto);
  }
}
