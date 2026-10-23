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
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
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

  //LISTA XID CIUDADANO
  @Get('lista-xciudadano')  
  async findXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.entradasSalidasService.findListaXCiudadano(+id_ciudadano);
  }
  //FIN LISTA XID CIUDADANO....................................................

  //LISTA SABANA XID CIUDADANO
  @Get('lista-sabana-xciudadano')  
  @Auth()
  async findListaSabanaXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,
    @Query('fecha_inicio', DateValidationPipe) fecha_inicio: string, 
    @Query('fecha_fin', DateValidationPipe) fecha_fin: string       
  ) {    
    
    return this.entradasSalidasService.findListaSabanaXCiudadano(+id_ciudadano, fecha_inicio, fecha_fin);
  }
  //FIN LISTA SABANA XID CIUDADANO....................................................

  //LISTA SABANA XID CIUDADANO
  @Get('lista-sabana-xinterno')  
  @Auth()
  async findListaSabanaXInterno(
    @Query('id_interno', ParseIntPipe) id_interno: string,
    @Query('fecha_inicio', DateValidationPipe) fecha_inicio: string, 
    @Query('fecha_fin', DateValidationPipe) fecha_fin: string       
  ) {    
    
    return this.entradasSalidasService.findListaSabanaXInterno(+id_interno, fecha_inicio, fecha_fin);
  }
  //FIN LISTA SABANA XID CIUDADANO....................................................

  //LISTA PENDIENTES SALIDA - fecha de ingreso actual - segun organismo del usuario, los que aun no registran.. 
  //..hora de salida
  @Get('lista-pendientes-salida')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findPendientesSalida(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {        

    return this.entradasSalidasService.findPendientesSalidaFechaActual(user);
  }
  //FIN LISTA  PENDIENTES SALIDA....................................................

  //LISTA INGRESOS ACTUALES - fecha de ingreso actual - segun organismo del usuario, los que aun no registran.. 
  //..hora de salida
  @Get('lista-ingresos-actuales')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findIngresosActuales(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {        
    
    return this.entradasSalidasService.findIngresosDelDia(user);
  }
  //FIN LISTA  INGRESOS ACTUALES....................................................

  //LISTA INGRESOS ACTUALES PARA CONTROL- fecha de ingreso actual - segun organismo del usuario, los que aun no registran.. 
  //..hora de salida
  @Get('lista-ingresos-actuales-minimizado')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findIngresosActualesControlHuella(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {        
    
    return this.entradasSalidasService.findIngresosDelDiaMinimizado(user);
  }
  //FIN LISTA  INGRESOS ACTUALES PARA CONTROL....................................................

  //BUSCAR CIUDADANO PARA VISITA
  @Get('buscar-ciudadano/:dni')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findCiudadanoParaVisita(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('dni', ParseIntPipe) dni: string,
  ) {        

    return this.entradasSalidasService.findCiudadanoParaVisita(+dni,user);
  }
  //FIN BUSCAR CIUDADANO PARA VISITA....................................................

  //BUSCAR ENTRADA PARA CONTROL XFICHA
  @Get('buscar-entrada-control-ficha/:numeroficha')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findEntradaControlXFicha(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('numeroficha', ParseIntPipe) numeroficha: string,
  ) {        

    return this.entradasSalidasService.findIngresoControlXNumFicha(numeroficha,user);
  }
  //FIN BUSCAR ENTRADA PARA CONTROL XFICHA....................................................

  //BUSCAR ENTRADA PARA CONTROL PUERTA PRINCIPAL XCIUDADANO
  @Get('buscar-entrada-control-pp-xciudadano/:idCiudadano')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findEntradaControlPPrincipalXIdCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('idCiudadano', ParseIntPipe) idCiudadano: string,
  ) {        
    
    return this.entradasSalidasService.findIngresoControlXIdCiudadano(+idCiudadano,"puerta_principal",user);
  }
  //FIN BUSCAR ENTRADA PARA CONTROL PUERTA PRINCIPAL XCIUDADANO....................................................

  //BUSCAR ENTRADA PARA CONTROL PORTON 4 XCIUDADANO
  @Get('buscar-entrada-control-porton4-xciudadano/:idCiudadano')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findEntradaControlPorton4XIdCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('idCiudadano', ParseIntPipe) idCiudadano: string,
  ) {        
    
    return this.entradasSalidasService.findIngresoControlXIdCiudadano(+idCiudadano,"porton_4",user);
  }
  //FIN BUSCAR ENTRADA PARA CONTROL PORTON 4 XCIUDADANO....................................................

  //BUSCAR ENTRADA PARA CONTROL MESA_CONTROL XCIUDADANO
  @Get('buscar-entrada-control-mesacontrol-xciudadano/:idCiudadano')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findEntradaControlMesaControlXIdCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('idCiudadano', ParseIntPipe) idCiudadano: string,
  ) {        
    
    return this.entradasSalidasService.findIngresoControlXIdCiudadano(+idCiudadano,"mesa_control",user);
  }
  //FIN BUSCAR ENTRADA PARA CONTROL MESA_CONTROL4 XCIUDADANO....................................................
  //-----------------------------------------------------------------------------------------------------------
  
  //BUSCAR ENTRADA PARA CONTROL CONTROL_INTERNO XCIUDADANO
  @Get('buscar-entrada-control-controlinterno-xciudadano/:idCiudadano')  
  @Auth(ValidRoles.ciudadanoAdmin, ValidRoles.ciudadanoOperador, ValidRoles.visitaOperador, ValidRoles.visitaAdmin)
  async findEntradaControlControlIdCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('idCiudadano', ParseIntPipe) idCiudadano: string,
  ) {        
    
    return this.entradasSalidasService.findIngresoControlXIdCiudadano(+idCiudadano,"control_interno",user);
  }
  //FIN BUSCAR ENTRADA PARA CONTROL CONTROL_INTERNO XCIUDADANO
  //...........................................................................................

  //OBTENER COMPUTO POR ORGANISMO
  @Get('computo-xorganismo')  
  @Auth(ValidRoles.visitaOperador, ValidRoles.visitaAdmin, ValidRoles.ciudadanoOperador, ValidRoles.ciudadanoConsulta, ValidRoles.ciudadanoAdmin)
  async obtenerComputoXOrganismo(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    //@Query('id_interno', ParseIntPipe) id_interno: string
    
  ) {    
    
    return this.entradasSalidasService.obtenerComputo(user.organismo_id);
  }
  //FIN OBTENER COMPUTO POR ORGANISMO....................................................

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

  //REGISTRAR CONTROL INGRESO ACCESO 4 - (tipoControl: puerta_principal, porton_4, mesa_control, control_interno)
  @Put('registrar-controlingreso-acceso4')
  @Auth(ValidRoles.visitaAdmin, ValidRoles.visitaOperador,)
  updateRegistarControlIngresoPorton4(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
  ) {

    
    return this.entradasSalidasService.registrarHorarioControlXIdEntrada(+id_registro, "porton_4", "ingreso", user);
  }
  //FIN REGISTRAR CONTROL INGRESO ACCESO 4
  //-------------------------------------------------------------------------------------

  //REGISTRAR CONTROL EGRESO ACCESO 4 - (tipoControl: puerta_principal, porton_4, mesa_control, control_interno)
  @Put('registrar-controlegreso-acceso4')
  @Auth(ValidRoles.visitaAdmin, ValidRoles.visitaOperador,)
  updateRegistarControlegresoPorton4(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
  ) {
    
    return this.entradasSalidasService.registrarHorarioControlXIdEntrada(+id_registro, "porton_4", "egreso", user);
  }
  //FIN REGISTRAR CONTROL EGRESO PORTON 4.................................
  //----------------------------------------------------.-----------------

   //REGISTRAR CONTROL INGRESO CONTROL INTERNO - (tipoControl: puerta_principal, porton_4, mesa_control, control_interno)
  @Put('registrar-controlingreso-controlinterno')
  @Auth(ValidRoles.visitaAdmin, ValidRoles.visitaOperador,)
  updateRegistarControlIngresoControlInterno(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
  ) {

    
    return this.entradasSalidasService.registrarHorarioControlXIdEntrada(+id_registro, "control_interno", "ingreso", user);
  }
  //FIN REGISTRAR CONTROL INGRESO CONTROL INTERNO
  //-------------------------------------------------------------------------------------

  //REGISTRAR CONTROL EGRESO CONTROL INTERNO - (tipoControl: puerta_principal, porton_4, mesa_control, control_interno)
  @Put('registrar-controlegreso-controlinterno')
  @Auth(ValidRoles.visitaAdmin, ValidRoles.visitaOperador,)
  updateRegistarControlegresoControlInterno(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
  ) {
    
    return this.entradasSalidasService.registrarHorarioControlXIdEntrada(+id_registro, "control_interno", "egreso", user);
  }
  //FIN REGISTRAR CONTROL EGRESO CONTROL INTERNO................................
  //----------------------------------------------------.-----------------

  //REGISTRAR CONTROL INGRESO MESA CONTROL (tipoControl: puerta_principal, porton_4, mesa_control, control_interno)
  @Put('registrar-controlingreso-mesacontrol')
  @Auth(ValidRoles.visitaAdmin, ValidRoles.visitaOperador,)
  updateRegistarControlIngresoMesaConntrol(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
  ) {
    
    return this.entradasSalidasService.registrarHorarioControlXIdEntrada(+id_registro, "mesa_control", "ingreso", user);
  }
  //FIN REGISTRAR CONTROL INGRESO  MESA CONTROL
  //-------------------------------------------------------------------------------------

  //REGISTRAR CONTROL EGRESO  MESA CONTROL - (tipoControl: puerta_principal, porton_4, mesa_control, control_interno)
  @Put('registrar-controlegreso-mesacontrol')
  @Auth(ValidRoles.visitaAdmin, ValidRoles.visitaOperador,)
  updateRegistarControlegresoMesaControl(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
  ) {
    
    return this.entradasSalidasService.registrarHorarioControlXIdEntrada(+id_registro, "mesa_control", "egreso", user);
  }
  //FIN REGISTRAR CONTROL EGRESO  MESA CONTROL................................
  //----------------------------------------------------.-----------------

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
