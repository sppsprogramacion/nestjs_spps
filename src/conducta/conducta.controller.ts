import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { ConductaService } from './conducta.service';
import { CreateConductaDto } from './dto/create-conducta.dto';
import { UpdateConductaDto } from './dto/update-conducta.dto';

@Controller('conducta')
export class ConductaController {
  constructor(private readonly conductaService: ConductaService) {}

  @Post()
  create(@Body() data: CreateConductaDto) {
    return this.conductaService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.conductaService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.conductaService.findOne(+id);
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
    @Body() dataDto: UpdateConductaDto
  ) {

    return this.conductaService.update(+id, dataDto);
  }
}
