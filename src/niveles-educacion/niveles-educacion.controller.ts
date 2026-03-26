import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { NivelesEducacionService } from './niveles-educacion.service';
import { CreateNivelesEducacionDto } from './dto/create-niveles-educacion.dto';
import { UpdateNivelesEducacionDto } from './dto/update-niveles-educacion.dto';

@Controller('niveles-educacion')
export class NivelesEducacionController {
  constructor(private readonly nivelesEducacionService: NivelesEducacionService) {}

  @Post()
  create(@Body() data: CreateNivelesEducacionDto) {
    return this.nivelesEducacionService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.nivelesEducacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.nivelesEducacionService.findOne(+id);
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
    @Body() dataDto: UpdateNivelesEducacionDto
  ) {

    return this.nivelesEducacionService.update(+id, dataDto);
  }
}
