import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CausasService } from './causas.service';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('causas')
export class CausasController {
  constructor(private readonly causasService: CausasService) {}

  @Post()
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateCausaDto
  ) {
        
    return this.causasService.create(data, user);
  }  

  @Get('todos')
  @Auth(ValidRoles.superadmin)
  findAll() {
    return this.causasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.causasService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...............................
  

  @Put(':id')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  update(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateCausaDto
  ) {
    
    return this.causasService.update(+id, dataDto, user);
  }
  
}
