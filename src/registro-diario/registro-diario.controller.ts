import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put, Query } from '@nestjs/common';
import { RegistroDiarioService } from './registro-diario.service';
import { CreateRegistroDiarioDto } from './dto/create-registro-diario.dto';
import { UpdateRegistroDiarioDto } from './dto/update-registro-diario.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { DateValidationPipe } from 'src/pipes/date-validation.pipe';
import { TimeValidationPipe } from 'src/pipes/time-validation.pipe';
import { UpdateAnularDto } from './dto/update-anular.dto';
import { UpdateEgresoDto } from './dto/update-egreso.dto';
import { Auth, GetUser } from 'src/auth/decorators';
@Controller('registro-diario')
export class RegistroDiarioController {
  constructor(private readonly registroDiarioService: RegistroDiarioService) {}

  @Post()
  @Auth()
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateRegistroDiarioDto
  ) {
    
    return this.registroDiarioService.create(data, user);
  }  

  @Get('todos')
  findAll() {
    return this.registroDiarioService.findAll();
  }

  //BUSCAR  XID CIUDADANO
  @Get('lista-xciudadano')  
  async findXCiudadano(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string    
  ) {    
    
    return this.registroDiarioService.findXCiudadano(+id_ciudadano);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  //BUSCAR PENDIENTES SALIDA - fecha de ingreso actual - segun organismo del usuario, los que aun no registran.. 
  //..hora de salida
  @Get('lista-pendientes-salida')  
  @Auth()
  async findPendientesSalida(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {    
    

    return this.registroDiarioService.findPendientesSalidaFechaActual(user);
  }
  //FIN BUSCAR  PENDIENTES SALIDA....................................................

  //BUSCAR XFECHA_HORA_INGRESO_EGRESO - fecha de ingreso actual - segun organismo del usuario, los que aun no registran.. 
  //..hora de salida
  @Get('lista-fecha-hora')  
  @Auth()
  async findXFechaHoraIngresoEgreso(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('fecha_ingreso', DateValidationPipe) fecha_ingreso: string,
    @Query('hora_inicio', TimeValidationPipe) hora_inicio: string,
    @Query('hora_fin', TimeValidationPipe) hora_fin: string,      
  ) {    
    
    
    return this.registroDiarioService.findXFechaHoraIngresoEgreso(fecha_ingreso,hora_inicio, hora_fin, user);
  }
  //FIN BUSCAR  XFECHA_INGRESO....................................................


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
 

  //EGRESO REGISTRO
  @Put('egreso')
  @Auth()
  updateEgreso(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
    @Body() dataDto: UpdateEgresoDto
  ) {

    
    return this.registroDiarioService.registrarEgreso(+id_registro, dataDto, user);
  }
  //FIN EGRESO REGISTRO.................................

  //ANULAR REGISTRO
  @Put('anular')
  @Auth()
  updateAnular(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
    @Body() dataDto: UpdateAnularDto
  ) {
   

    return this.registroDiarioService.anularRegistro(+id_registro, dataDto, user);
  }
  //FIN ANULAR REGISTRO.................................

  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: string, 
  //   @Body() dataDto: UpdateRegistroDiarioDto
  // ) {

  //   return this.registroDiarioService.update(+id, dataDto);
  // }
}
