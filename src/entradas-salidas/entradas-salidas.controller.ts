import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { EntradasSalidasService } from './entradas-salidas.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateEntradasSalidaDto } from './dto/create-entradas-salida.dto';
import { DateValidationPipe } from 'src/pipes/date-validation.pipe';
import { TimeValidationPipe } from 'src/pipes/time-validation.pipe';
import { UpdateEntradaPrincipalEgresoDto } from './dto/update-entrada-principal-egreso.dto';
import { UpdateEntradaSalidasCancelarDto } from './dto/update-entradas-salidas-cancelar.dto';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('entradas-salidas')
export class EntradasSalidasController {
  constructor(private readonly entradasSalidasService: EntradasSalidasService) {}

  @Post()
  @Auth()
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateEntradasSalidaDto
  ) {
    
    return this.entradasSalidasService.create(data, user);
  }  

  @Get('todos')
  findAll() {
    return this.entradasSalidasService.findAll();
  }

  //BUSCAR  XID CIUDADANO
  @Get('lista-xciudadano')  
  async findXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.entradasSalidasService.findXCiudadano(+id_ciudadano);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  //BUSCAR PENDIENTES SALIDA - fecha de ingreso actual - segun organismo del usuario, los que aun no registran.. 
  //..hora de salida
  @Get('lista-pendientes-salida')  
  @Auth()
  async findPendientesSalida(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {        

    return this.entradasSalidasService.findPendientesSalidaFechaActual(user);
  }
  //FIN BUSCAR  PENDIENTES SALIDA....................................................

  //BUSCAR PENDIENTES SALIDA - fecha de ingreso actual - segun organismo del usuario, los que aun no registran.. 
  //..hora de salida
  @Get('lista-ingresos-actuales')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findIngresosActuales(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {        

    return this.entradasSalidasService.findIngresosDelDia(user);
  }
  //FIN BUSCAR  PENDIENTES SALIDA....................................................

  //CIUDADANO PARA VISITA
  @Get('buscar-ciudadano/:dni')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findCiudadanoParaVisita(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('dni', ParseIntPipe) dni: string,
  ) {        

    return this.entradasSalidasService.findCiudadanoParaVisita(+dni,user);
  }
  //FIN BUSCAR PARA VISITA....................................................

  //CIUDADANO PARA INGRESO SECUNDARIO
  @Get('buscar-ciudadano-ingreso-control/:numeroficha')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findIngresoSecundario(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('numeroficha', ParseIntPipe) numeroficha: string,
  ) {        

    return this.entradasSalidasService.findCiudadanoIngresoControl(numeroficha,user);
  }
  //FIN BUSCAR INGRESO SECUNDARIO....................................................
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.entradasSalidasService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........
  

  //EGRESO REGISTRO
  @Put('egreso')
  @Auth(ValidRoles.visitaAdmin, ValidRoles.visitaOperador,)
  updateEgreso(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
    @Body() dataDto: UpdateEntradaPrincipalEgresoDto
  ) {

    
    return this.entradasSalidasService.registrarEgreso(+id_registro, dataDto, user);
  }
  //FIN EGRESO REGISTRO.................................

  //CANCELAR REGISTRO
  @Put('cancelar')
  @Auth(ValidRoles.visitaAdmin)
  updateAnular(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
    @Body() dataDto: UpdateEntradaSalidasCancelarDto
  ) {
    

    return this.entradasSalidasService.cancelarRegistro(+id_registro, dataDto, user);
  }
  //FIN CANCELAR REGISTRO.................................
}
