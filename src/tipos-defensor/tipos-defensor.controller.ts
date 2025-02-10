import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { TiposDefensorService } from './tipos-defensor.service';
import { CreateTiposDefensorDto } from './dto/create-tipos-defensor.dto';
import { UpdateTiposDefensorDto } from './dto/update-tipos-defensor.dto';

@Controller('tipos-defensor')
export class TiposDefensorController {
  constructor(private readonly tiposDefensorService: TiposDefensorService) {}

  @Post()
  create(@Body() data: CreateTiposDefensorDto) {
    return this.tiposDefensorService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.tiposDefensorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.tiposDefensorService.findOne(+id);
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
    @Body() dataDto: UpdateTiposDefensorDto
  ) {

    return this.tiposDefensorService.update(+id, dataDto);
  }
}
