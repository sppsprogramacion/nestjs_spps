import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { UsuariosRolService } from './usuarios-rol.service';
import { CreateUsuariosRolDto } from './dto/create-usuarios-rol.dto';
import { UpdateUsuariosRolDto } from './dto/update-usuarios-rol.dto';

@Controller('usuarios-rol')
export class UsuariosRolController {
  constructor(private readonly usuariosRolService: UsuariosRolService) {}

  @Post()
  create(@Body() data: CreateUsuariosRolDto) {
    return this.usuariosRolService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.usuariosRolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.usuariosRolService.findOne(+id);
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
    @Body() dataDto: UpdateUsuariosRolDto
  ) {

    return this.usuariosRolService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    
    return this.usuariosRolService.remove(+id);
  }
}
