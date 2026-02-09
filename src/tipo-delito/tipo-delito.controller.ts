import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Put } from '@nestjs/common';
import { TipoDelitoService } from './tipo-delito.service';
import { CreateTipoDelitoDto } from './dto/create-tipo-delito.dto';
import { UpdateTipoDelitoDto } from './dto/update-tipo-delito.dto';

@Controller('tipo-delito')
export class TipoDelitoController {
  constructor(private readonly tipoDelitoService: TipoDelitoService) {}

  @Post()
  create(@Body() data: CreateTipoDelitoDto) {
    return this.tipoDelitoService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.tipoDelitoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.tipoDelitoService.findOne(+id);
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
    @Body() dataDto: UpdateTipoDelitoDto
  ) {

    return this.tipoDelitoService.update(+id, dataDto);
  }
}
