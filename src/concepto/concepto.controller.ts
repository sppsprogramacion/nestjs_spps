import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { ConceptoService } from './concepto.service';
import { CreateConceptoDto } from './dto/create-concepto.dto';
import { UpdateConceptoDto } from './dto/update-concepto.dto';

@Controller('concepto')
export class ConceptoController {
  constructor(private readonly conceptoService: ConceptoService) {}

  @Post()
  create(@Body() data: CreateConceptoDto) {
    return this.conceptoService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.conceptoService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.conceptoService.findOne(+id);
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
    @Body() dataDto: UpdateConceptoDto
  ) {

    return this.conceptoService.update(+id, dataDto);
  }
}
