import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { OrganismosService } from './organismos.service';
import { CreateOrganismoDto } from './dto/create-organismo.dto';
import { UpdateOrganismoDto } from './dto/update-organismo.dto';

@Controller('organismos')
export class OrganismosController {
  constructor(private readonly organismosService: OrganismosService) {}

  @Post()
  create(@Body() data: CreateOrganismoDto) {
    return this.organismosService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.organismosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.organismosService.findOne(+id);
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
    @Body() dataDto: UpdateOrganismoDto
  ) {

    return this.organismosService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.organismosService.remove(+id);
  }
}
