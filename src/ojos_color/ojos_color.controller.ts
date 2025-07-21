import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { OjosColorService } from './ojos_color.service';
import { CreateOjosColorDto } from './dto/create-ojos_color.dto';
import { UpdateOjosColorDto } from './dto/update-ojos_color.dto';

@Controller('ojos-color')
export class OjosColorController {
  constructor(private readonly ojosColorService: OjosColorService) {}

  @Post()
    create(@Body() data: CreateOjosColorDto) {
      return this.ojosColorService.create(data);
    }  
  
    @Get('todos')
    findAll() {
      return this.ojosColorService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {    
      
      return this.ojosColorService.findOne(id);
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
      @Body() dataDto: UpdateOjosColorDto
    ) {
  
      return this.ojosColorService.update(id, dataDto);
    }
}
