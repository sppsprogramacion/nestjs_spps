import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { TiposAccesoService } from './tipos_acceso.service';
import { CreateTiposAccesoDto } from './dto/create-tipos_acceso.dto';
import { UpdateTiposAccesoDto } from './dto/update-tipos_acceso.dto';

@Controller('tipos-acceso')
export class TiposAccesoController {
  constructor(private readonly tiposAccesoService: TiposAccesoService) {}

  @Post()
  create(@Body() data: CreateTiposAccesoDto) {
    return this.tiposAccesoService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.tiposAccesoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.tiposAccesoService.findOne(+id);
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
    @Body() dataDto: UpdateTiposAccesoDto
  ) {

    return this.tiposAccesoService.update(+id, dataDto);
  }

}
