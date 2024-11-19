import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { OrganismosUsuarioService } from './organismos-usuario.service';
import { CreateOrganismosUsuarioDto } from './dto/create-organismos-usuario.dto';
import { UpdateOrganismosUsuarioDto } from './dto/update-organismos-usuario.dto';

@Controller('organismos-usuario')
export class OrganismosUsuarioController {
  constructor(private readonly organismosUsuarioService: OrganismosUsuarioService) {}

  @Post()
  create(@Body() data: CreateOrganismosUsuarioDto) {
    return this.organismosUsuarioService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.organismosUsuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.organismosUsuarioService.findOne(+id);
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
    @Body() dataDto: UpdateOrganismosUsuarioDto
  ) {

    return this.organismosUsuarioService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.organismosUsuarioService.remove(+id);
  }
}
