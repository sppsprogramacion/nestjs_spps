import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { PabellonesService } from './pabellones.service';
import { CreatePabelloneDto } from './dto/create-pabellone.dto';
import { UpdatePabelloneDto } from './dto/update-pabellone.dto';

@Controller('pabellones')
export class PabellonesController {
  constructor(private readonly pabellonesService: PabellonesService) {}

  @Post()
  create(@Body() data: CreatePabelloneDto) {
    return this.pabellonesService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.pabellonesService.findAll();
  }

  //BUSCAR  XID ORGANISMO
  @Get('buscar-xorganismo')  
  async findXDepartamento(
    @Query('id_organismo', ParseIntPipe) id_organismo: string
    
  ) {    
    
    return this.pabellonesService.findXOrganismo(+id_organismo);
  }
  //FIN BUSCAR  XID DEPARTAMENTO....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.pabellonesService.findOne(+id);
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
    @Body() dataDto: UpdatePabelloneDto
  ) {

    return this.pabellonesService.update(+id, dataDto);
  }


}
