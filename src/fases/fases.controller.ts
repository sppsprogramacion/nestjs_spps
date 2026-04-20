import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { FasesService } from './fases.service';
import { CreateFaseDto } from './dto/create-fase.dto';
import { UpdateFaseDto } from './dto/update-fase.dto';

@Controller('fases')
export class FasesController {
  constructor(private readonly fasesService: FasesService) {}

  @Post()
  create(@Body() data: CreateFaseDto) {
    return this.fasesService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.fasesService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.fasesService.findOne(+id);
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
    @Body() dataDto: UpdateFaseDto
  ) {

    return this.fasesService.update(+id, dataDto);
  }
}
