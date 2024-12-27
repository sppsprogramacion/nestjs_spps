import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() data: CreateRoleDto) {
    return this.rolesService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    
    return this.rolesService.findOne(id);
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
    @Body() dataDto: UpdateRoleDto
  ) {
    
    return this.rolesService.update(id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    
    return this.rolesService.remove(id);
  }
}
