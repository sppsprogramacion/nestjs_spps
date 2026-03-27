import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { ReligionesService } from './religiones.service';
import { CreateReligioneDto } from './dto/create-religione.dto';
import { UpdateReligioneDto } from './dto/update-religione.dto';
import { UpdateNivelesEducacionDto } from 'src/niveles-educacion/dto/update-niveles-educacion.dto';

@Controller('religiones')
export class ReligionesController {
  constructor(private readonly religionesService: ReligionesService) {}

  @Post()
    create(@Body() data: CreateReligioneDto) {
      return this.religionesService.create(data);
    }  
  
    @Get('todos')
    findAll() {
      return this.religionesService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {    
      
      return this.religionesService.findOne(+id);
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
      @Body() dataDto: UpdateReligioneDto
    ) {
  
      return this.religionesService.update(+id, dataDto);
    }
}
