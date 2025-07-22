import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { PeloColorService } from './pelo-color.service';
import { CreatePeloColorDto } from './dto/create-pelo-color.dto';
import { UpdatePeloColorDto } from './dto/update-pelo-color.dto';

@Controller('pelo-color')
export class PeloColorController {
  constructor(private readonly peloColorService: PeloColorService) {}

  @Post()
  create(@Body() data: CreatePeloColorDto) {
    return this.peloColorService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.peloColorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    return this.peloColorService.findOne(id);
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
    @Body() dataDto: UpdatePeloColorDto
  ) {

    return this.peloColorService.update(id, dataDto);
  }
}
