import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { TamanioService } from './tamanio.service';
import { CreateTamanioDto } from './dto/create-tamanio.dto';
import { UpdateTamanioDto } from './dto/update-tamanio.dto';

@Controller('tamanio')
export class TamanioController {
  constructor(private readonly tamanioService: TamanioService) {}

  @Post()
  create(@Body() data: CreateTamanioDto) {
    return this.tamanioService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.tamanioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    return this.tamanioService.findOne(id);
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
    @Body() dataDto: UpdateTamanioDto
  ) {

    return this.tamanioService.update(id, dataDto);
  }
}
