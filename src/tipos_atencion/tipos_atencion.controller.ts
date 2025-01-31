import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { TiposAtencionService } from './tipos_atencion.service';
import { CreateTiposAtencionDto } from './dto/create-tipos_atencion.dto';
import { UpdateTiposAtencionDto } from './dto/update-tipos_atencion.dto';

@Controller('tipos-atencion')
export class TiposAtencionController {
  constructor(private readonly tiposAtencionService: TiposAtencionService) {}

  @Post()
  create(@Body() data: CreateTiposAtencionDto) {
    return this.tiposAtencionService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.tiposAtencionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.tiposAtencionService.findOne(+id);
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
    @Body() dataDto: UpdateTiposAtencionDto
  ) {

    return this.tiposAtencionService.update(+id, dataDto);
  }

  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: string) {
    
  //   return this.tiposAtencionService.remove(+id);
  // }
}
