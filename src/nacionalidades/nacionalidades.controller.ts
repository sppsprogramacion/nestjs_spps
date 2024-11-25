import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { NacionalidadesService } from './nacionalidades.service';
import { CreateNacionalidadeDto } from './dto/create-nacionalidade.dto';
import { UpdateNacionalidadeDto } from './dto/update-nacionalidade.dto';

@Controller('nacionalidades')
export class NacionalidadesController {
  constructor(private readonly nacionalidadesService: NacionalidadesService) {}
  
  @Post()
  create(@Body() data: CreateNacionalidadeDto) {
    return this.nacionalidadesService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.nacionalidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    
    return this.nacionalidadesService.findOne(id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() dataDto: UpdateNacionalidadeDto
  ) {
    
    return this.nacionalidadesService.update(id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.nacionalidadesService.remove(id);
  }
  }
