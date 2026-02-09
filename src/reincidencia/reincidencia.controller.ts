import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { ReincidenciaService } from './reincidencia.service';
import { CreateReincidenciaDto } from './dto/create-reincidencia.dto';
import { UpdateReincidenciaDto } from './dto/update-reincidencia.dto';

@Controller('reincidencia')
export class ReincidenciaController {
  constructor(private readonly reincidenciaService: ReincidenciaService) {}

  @Post()
  create(@Body() data: CreateReincidenciaDto) {
    return this.reincidenciaService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.reincidenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    return this.reincidenciaService.findOne(id);
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
    @Body() dataDto: UpdateReincidenciaDto
  ) {

    return this.reincidenciaService.update(id, dataDto);
  }
}
