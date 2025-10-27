import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { ZonaResidenciaService } from './zona-residencia.service';
import { CreateZonaResidenciaDto } from './dto/create-zona-residencia.dto';
import { UpdateZonaResidenciaDto } from './dto/update-zona-residencia.dto';

@Controller('zona-residencia')
export class ZonaResidenciaController {
  constructor(private readonly zonaResidenciaService: ZonaResidenciaService) {}

  @Post()
    create(@Body() data: CreateZonaResidenciaDto) {
      return this.zonaResidenciaService.create(data);
    }  
  
    @Get('todos')
    findAll() {
      return this.zonaResidenciaService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {    
      
      return this.zonaResidenciaService.findOne(id);
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
      @Body() dataDto: UpdateZonaResidenciaDto
    ) {
  
      return this.zonaResidenciaService.update(id, dataDto);
    }
}
