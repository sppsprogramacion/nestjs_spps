import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { PeloTipoService } from './pelo-tipo.service';
import { CreatePeloTipoDto } from './dto/create-pelo-tipo.dto';
import { UpdatePeloTipoDto } from './dto/update-pelo-tipo.dto';

@Controller('pelo-tipo')
export class PeloTipoController {
  constructor(private readonly peloTipoService: PeloTipoService) {}

  @Post()
    create(@Body() data: CreatePeloTipoDto) {
      return this.peloTipoService.create(data);
    }  
  
    @Get('todos')
    findAll() {
      return this.peloTipoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {    
      
      return this.peloTipoService.findOne(id);
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
      @Body() dataDto: UpdatePeloTipoDto
    ) {
  
      return this.peloTipoService.update(id, dataDto);
    }
}
