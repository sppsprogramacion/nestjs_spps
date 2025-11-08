import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { ReingresoService } from './reingreso.service';
import { CreateReingresoDto } from './dto/create-reingreso.dto';
import { UpdateReingresoDto } from './dto/update-reingreso.dto';

@Controller('reingreso')
export class ReingresoController {
  constructor(private readonly reingresoService: ReingresoService) {}

  @Post()
  create(@Body() data: CreateReingresoDto) {
    return this.reingresoService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.reingresoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.reingresoService.findOne(+id);
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
    @Body() dataDto: UpdateReingresoDto
  ) {

    return this.reingresoService.update(+id, dataDto);
  }
}

