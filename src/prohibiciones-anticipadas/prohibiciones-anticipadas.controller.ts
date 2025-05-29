import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put, Query } from '@nestjs/common';
import { ProhibicionesAnticipadasService } from './prohibiciones-anticipadas.service';
import { CreateProhibicionesAnticipadaDto } from './dto/create-prohibiciones-anticipada.dto';
import { UpdateProhibicionesAnticipadaDto } from './dto/update-prohibiciones-anticipada.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { LevantarManualProhibicionAnticipadaDto } from './dto/levantar-manual-prohibicion-anticipada.dto';
import { UpdateResult } from 'typeorm';

@Controller('prohibiciones-anticipadas')
export class ProhibicionesAnticipadasController {
  constructor(private readonly prohibicionesAnticipadasService: ProhibicionesAnticipadasService) {}

  //LEVANTAR PROHIBICIONES AUTOMATICO
  @Post('levantar-automatico')
  @Auth()
  actualizarExpiradas(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    
  ): Promise<UpdateResult> {
    return this.prohibicionesAnticipadasService.levantarAutomatico(user);
  }
  //FIN LEVANTAR PROHIBICIONES AUTOMATICO......................................................

  @Post()
  @Auth()
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateProhibicionesAnticipadaDto
  ) {
  
    return this.prohibicionesAnticipadasService.create(data, user);
  }  
  
  
  @Get('todos')
  @Auth()
  findAll(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return this.prohibicionesAnticipadasService.findAll();
  }

  //BUSCAR LISTA X APELLIDO
  @Get('buscarlista-xapellido')  
  @Auth()
  async findListaXApellido(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('apellido') apellido: string, 
  ) {    

    if ( apellido.length < 2 ) throw new NotFoundException('El apellido de busqueda debe tener mínimo (02) dos caracteres.');
          
    return this.prohibicionesAnticipadasService.findListaXApellido(apellido);
  }
  //FIN BUSCAR LISTA X APELLIDO...........................................

  @Get(':id')
  @Auth()
  findOne(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe) id: string
  ) {    
    
    return this.prohibicionesAnticipadasService.findOne(+id);
  }
  
  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...............................
  
  //LEVANTAMIENTO MANUAL
  @Put('levantar-manual')
  @Auth()
  updateLevantarManual(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
    @Body() dataDto: LevantarManualProhibicionAnticipadaDto
  ) {

    return this.prohibicionesAnticipadasService.levantarManualmente(+id_prohibicion, dataDto, "levantar", user);
  }
  //FIN LEVANTAMIENTO MANUAL.................................
  
  
  @Put(':id')
  @Auth()
  update(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateProhibicionesAnticipadaDto
  ) {

    return this.prohibicionesAnticipadasService.update(+id, dataDto, user);
  }
  
}
