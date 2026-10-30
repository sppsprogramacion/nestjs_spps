import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { ProhibicionesVisitaService } from './prohibiciones-visita.service';
import { CreateProhibicionesVisitaDto } from './dto/create-prohibiciones-visita.dto';
import { UpdateProhibicionesVisitaDto } from './dto/update-prohibiciones-visita.dto';
import { LevantarManualProhibicionesVisitaDto } from './dto/levantar-manual-prohibiciones-visita.dto';
import { AnularProhibicionesVisitaDto } from './dto/anular-prohibiciones-visita.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { DateValidationPipe } from 'src/pipes/date-validation.pipe';

@Controller('prohibiciones-visita')
export class ProhibicionesVisitaController {
  constructor(private readonly prohibicionesVisitaService: ProhibicionesVisitaService) {}

  @Post()
  @Auth(ValidRoles.restriccionOperador, ValidRoles.restriccionAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateProhibicionesVisitaDto
  ) {
        
    return this.prohibicionesVisitaService.create(data, user);
  }  

  //BUSCAR LISTA XORGANISMO Y FECHA 
    @Get('lista-organismo-fecha')  
    @Auth(ValidRoles.restriccionOperador, ValidRoles.restriccionAdmin)
    async findListaXOrganismoFecha(
      @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
      @Query('fecha_inicio', DateValidationPipe) fecha_inicio: string,
      @Query('fecha_fin', DateValidationPipe) fecha_fin: string,
      
    ) {    
      
      
      return this.prohibicionesVisitaService.findListaXFechaXOrganismo(fecha_inicio, fecha_fin, user);
    }
    //FIN BUSCAR  LISTA XORGANISMO Y FECHA 
    // ....................................................--------------------------------------
  

  //BUSCAR  XID CIUDADANO
  @Get('buscar-xciudadano')  
  @Auth(ValidRoles.restriccionOperador, ValidRoles.restriccionAdmin, ValidRoles.ciudadanoOperador,ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoConsulta)
  async findXCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string
    
  ) {    
    
    return this.prohibicionesVisitaService.findXCiudano(+id_ciudadano);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.prohibicionesVisitaService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...............................

  //LEVANTAMIENTO MANUAL
  @Put('levantar-manual')
  @Auth(ValidRoles.restriccionOperador, ValidRoles.restriccionAdmin)
  updateLevantarManual(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
    @Body() dataDto: LevantarManualProhibicionesVisitaDto
  ) {
    
    return this.prohibicionesVisitaService.levantarYProhibirManualmente(+id_prohibicion, dataDto, "levantar", user);
  }
  //FIN LEVANTAMIENTO MANUAL.................................

  //PROHIBIR MANUAL
  @Put('prohibir-manual')
  @Auth(ValidRoles.restriccionOperador, ValidRoles.restriccionAdmin)
  updateProhibirManual(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
    @Body() dataDto: LevantarManualProhibicionesVisitaDto
  ) {
    
    return this.prohibicionesVisitaService.levantarYProhibirManualmente(+id_prohibicion, dataDto, "prohibir", user);
  }
  //FIN PROHIBIR MANUAL.................................

  //ANULAR PROHIBICION
  @Put('anular')
  @Auth(ValidRoles.restriccionOperador, ValidRoles.restriccionAdmin)
  updateAnular(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_prohibicion', ParseIntPipe) id_prohibicion: string ,
    @Body() dataDto: AnularProhibicionesVisitaDto
  ) {
    
    return this.prohibicionesVisitaService.anularProhibicion(+id_prohibicion, dataDto, user);
  }
  //FIN ANULAR PROHIBICION.................................

  @Put(':id')
  @Auth(ValidRoles.restriccionOperador, ValidRoles.restriccionAdmin)
  update(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateProhibicionesVisitaDto
  ) {
    
    return this.prohibicionesVisitaService.update(+id, dataDto, user);
  }

}
