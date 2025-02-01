import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { RegistroDiarioService } from './registro-diario.service';
import { CreateRegistroDiarioDto } from './dto/create-registro-diario.dto';
import { UpdateRegistroDiarioDto } from './dto/update-registro-diario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
@Controller('registro-diario')
export class RegistroDiarioController {
  constructor(private readonly registroDiarioService: RegistroDiarioService) {}

  @Post()
  create(@Body() data: CreateRegistroDiarioDto) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;
    
    return this.registroDiarioService.create(data, usuariox);
  }  

  @Get('todos')
  findAll() {
    return this.registroDiarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.registroDiarioService.findOne(+id);
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
    @Body() dataDto: UpdateRegistroDiarioDto
  ) {

    return this.registroDiarioService.update(+id, dataDto);
  }
}
