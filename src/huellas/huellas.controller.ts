import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { HuellasService } from './huellas.service';
import { CreateHuellaDto } from './dto/create-huella.dto';
import { UpdateHuellaDto } from './dto/update-huella.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('huellas')
export class HuellasController {
  constructor(private readonly huellasService: HuellasService) {}

  @Post()
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateHuellaDto
  ) {
    return this.huellasService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.huellasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.huellasService.findOne(+id);
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
    @Body() dataDto: UpdateHuellaDto
  ) {

    return this.huellasService.update(+id, dataDto);
  }
}
