import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { VisitasInternosService } from './visitas-internos.service';
import { CreateVisitasInternoDto } from './dto/create-visitas-interno.dto';
import { UpdateVisitasInternoDto } from './dto/update-visitas-interno.dto';

@Controller('visitas-internos')
export class VisitasInternosController {
  constructor(private readonly visitasInternosService: VisitasInternosService) {}

  @Post()
  create(@Body() data: CreateVisitasInternoDto) {
    return this.visitasInternosService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.visitasInternosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.visitasInternosService.findOne(+id);
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
    @Body() dataDto: UpdateVisitasInternoDto
  ) {

    return this.visitasInternosService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.visitasInternosService.remove(+id);
  }
}
