import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { DedosHuellaService } from './dedos_huella.service';
import { CreateDedosHuellaDto } from './dto/create-dedos_huella.dto';
import { UpdateDedosHuellaDto } from './dto/update-dedos_huella.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('dedos-huella')
export class DedosHuellaController {
  constructor(private readonly dedosHuellaService: DedosHuellaService) {}

  @Post()
  @Auth()
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateDedosHuellaDto
  ) {
    return this.dedosHuellaService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.dedosHuellaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.dedosHuellaService.findOne(+id);
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
    @Body() dataDto: UpdateDedosHuellaDto
  ) {

    return this.dedosHuellaService.update(+id, dataDto);
  }
}
