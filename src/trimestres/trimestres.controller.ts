import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { TrimestresService } from './trimestres.service';
import { CreateTrimestreDto } from './dto/create-trimestre.dto';
import { UpdateTrimestreDto } from './dto/update-trimestre.dto';

@Controller('trimestres')
export class TrimestresController {
  constructor(private readonly trimestresService: TrimestresService) {}

  @Post()
  create(@Body() data: CreateTrimestreDto) {
    return this.trimestresService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.trimestresService.findAll();
  }
  

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.trimestresService.findOne(+id);
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
    @Body() dataDto: UpdateTrimestreDto
  ) {

    return this.trimestresService.update(+id, dataDto);
  }
}
