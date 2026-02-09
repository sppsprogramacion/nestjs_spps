import { Controller, Get, Post, Body, Param, NotFoundException, Put } from '@nestjs/common';
import { JuzgadosService } from './juzgados.service';
import { CreateJuzgadoDto } from './dto/create-juzgado.dto';
import { UpdateJuzgadoDto } from './dto/update-juzgado.dto';

@Controller('juzgados')
export class JuzgadosController {
  constructor(private readonly juzgadosService: JuzgadosService) {}

  @Post()
  create(@Body() data: CreateJuzgadoDto) {
    return this.juzgadosService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.juzgadosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    return this.juzgadosService.findOne(id);
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
    @Body() dataDto: UpdateJuzgadoDto
  ) {

    return this.juzgadosService.update(id, dataDto);
  }
}
