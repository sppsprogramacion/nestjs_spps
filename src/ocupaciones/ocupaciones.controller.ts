import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { OcupacionesService } from './ocupaciones.service';
import { CreateOcupacioneDto } from './dto/create-ocupacione.dto';
import { UpdateOcupacioneDto } from './dto/update-ocupacione.dto';

@Controller('ocupaciones')
export class OcupacionesController {
  constructor(private readonly ocupacionesService: OcupacionesService) {}

  @Post()
  create(@Body() data: CreateOcupacioneDto) {
    return this.ocupacionesService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.ocupacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.ocupacionesService.findOne(+id);
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
    @Body() dataDto: UpdateOcupacioneDto
  ) {

    return this.ocupacionesService.update(+id, dataDto);
  }
}
