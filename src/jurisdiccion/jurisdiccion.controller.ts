import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { JurisdiccionService } from './jurisdiccion.service';
import { CreateJurisdiccionDto } from './dto/create-jurisdiccion.dto';
import { UpdateJurisdiccionDto } from './dto/update-jurisdiccion.dto';

@Controller('jurisdiccion')
export class JurisdiccionController {

  constructor(private readonly jurisdiccionService: JurisdiccionService) {}

  @Post()
    create(@Body() data: CreateJurisdiccionDto) {
      return this.jurisdiccionService.create(data);
    }  
  
    @Get('todos')
    findAll() {
      return this.jurisdiccionService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {    
      
      return this.jurisdiccionService.findOne(id);
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
      @Body() dataDto: UpdateJurisdiccionDto
    ) {
  
      return this.jurisdiccionService.update(id, dataDto);
    }
  
}
