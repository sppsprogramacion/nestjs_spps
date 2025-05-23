import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put, Query } from '@nestjs/common';
import { ProhibicionesAnticipadasService } from './prohibiciones-anticipadas.service';
import { CreateProhibicionesAnticipadaDto } from './dto/create-prohibiciones-anticipada.dto';
import { UpdateProhibicionesAnticipadaDto } from './dto/update-prohibiciones-anticipada.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Auth, GetUser } from 'src/auth/decorators';

@Controller('prohibiciones-anticipadas')
export class ProhibicionesAnticipadasController {
  constructor(private readonly prohibicionesAnticipadasService: ProhibicionesAnticipadasService) {}

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
  // @Put('levantar-manual')
  // updateLevantarManual(
  //   @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
  //   @Body() dataDto: LevantarManualProhibicionesVisitaDto
  // ) {
  //   let usuariox: Usuario= new Usuario;
  //   usuariox.id_usuario = 2;
  //   usuariox.organismo_id = 1;

  //   return this.prohibicionesAnticipadasService.levantarYProhibirManualmente(+id_prohibicion, dataDto, "levantar", usuariox);
  // }
  //FIN LEVANTAMIENTO MANUAL.................................
  
    
  //ANULAR PROHIBICION
  // @Put('anular')
  // updateAnular(
  //   @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
  //   @Body() dataDto: AnularProhibicionesVisitaDto
  // ) {
  //   let usuariox: Usuario= new Usuario;
  //   usuariox.id_usuario = 2;
  //   usuariox.organismo_id = 1;
  
  //   return this.prohibicionesVisitaService.anularProhibicion(+id_prohibicion, dataDto, usuariox);
  // }
  //FIN ANULAR PROHIBICION.................................
  
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
