import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { SituacionProvisoriaService } from './situacion-provisoria.service';
import { CreateSituacionProvisoriaDto } from './dto/create-situacion-provisoria.dto';
import { UpdateSituacionProvisoriaDto } from './dto/update-situacion-provisoria.dto';

@Controller('situacion-provisoria')
export class SituacionProvisoriaController {
  constructor(private readonly situacionProvisoriaService: SituacionProvisoriaService) {}

  @Post()
  create(@Body() data: CreateSituacionProvisoriaDto) {
    return this.situacionProvisoriaService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.situacionProvisoriaService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.situacionProvisoriaService.findOne(+id);
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
    @Body() dataDto: UpdateSituacionProvisoriaDto
  ) {

    return this.situacionProvisoriaService.update(+id, dataDto);
  }
}
