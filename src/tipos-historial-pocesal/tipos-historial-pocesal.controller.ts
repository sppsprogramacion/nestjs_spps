import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { TiposHistorialPocesalService } from './tipos-historial-pocesal.service';
import { CreateTiposHistorialPocesalDto } from './dto/create-tipos-historial-pocesal.dto';
import { UpdateTiposHistorialPocesalDto } from './dto/update-tipos-historial-pocesal.dto';

@Controller('tipos-historial-pocesal')
export class TiposHistorialPocesalController {
  constructor(private readonly tiposHistorialPocesalService: TiposHistorialPocesalService) {}

  @Post()
  create(@Body() data: CreateTiposHistorialPocesalDto) {
    return this.tiposHistorialPocesalService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.tiposHistorialPocesalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.tiposHistorialPocesalService.findOne(+id);
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
    @Body() dataDto: UpdateTiposHistorialPocesalDto
  ) {

    return this.tiposHistorialPocesalService.update(+id, dataDto);
  }
  
}
