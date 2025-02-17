import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { DepartamentosService } from './departamentos.service';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';

@Controller('departamentos')
export class DepartamentosController {
  constructor(private readonly departamentosService: DepartamentosService) {}

  @Post()
  create(@Body() data: CreateDepartamentoDto) {
    return this.departamentosService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.departamentosService.findAll();
  }

  //BUSCAR  XID PROVINCIA
  @Get('buscar-xprovincia')  
  async findXPais(
    @Query('id_provincia') id_provincia: string    
  ) {    
    
    return this.departamentosService.findXProvincia(id_provincia);
  }
  //FIN BUSCAR  XID PROVINCIA....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.departamentosService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateDepartamentoDto
  ) {

    return this.departamentosService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.departamentosService.remove(+id);
  }
}
