import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { MunicipioService } from './municipio.service';
import { CreateMunicipioDto } from './dto/create-municipio.dto';
import { UpdateMunicipioDto } from './dto/update-municipio.dto';

@Controller('municipios')
export class MunicipioController {
  constructor(private readonly municipioService: MunicipioService) {}

  @Post()
  create(@Body() data: CreateMunicipioDto) {
    return this.municipioService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.municipioService.findAll();
  }

  //BUSCAR  XID DEPARTAMENTO
  @Get('buscar-xdepartamento')  
  async findXDepartamento(
    @Query('id_departamento', ParseIntPipe) id_departamento: string
    
  ) {    
    
    return this.municipioService.findXDepartamento(+id_departamento);
  }
  //FIN BUSCAR  XID DEPARTAMENTO....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.municipioService.findOne(+id);
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
    @Body() dataDto: UpdateMunicipioDto
  ) {

    return this.municipioService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.municipioService.remove(+id);
  }
}
