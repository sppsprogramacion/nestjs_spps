import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put } from '@nestjs/common';
import { ExcepcionesIngresoVisitaService } from './excepciones-ingreso-visita.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateExcepcionIngresoVisitaDto } from './dto/create-excepciones-ingreso-visita.dto';
import { AnularExepcionDto } from './dto/anular-exepcion-visita.dto';
import { CumplimentarExepcionDto } from './dto/cumplimentar-exepcion-visita.dto';
import { DateValidationPipe } from 'src/pipes/date-validation.pipe';


@Controller('excepciones-ingreso-visita')
export class ExcepcionesIngresoVisitaController {
  constructor(private readonly excepcionesIngresoVisitaService: ExcepcionesIngresoVisitaService) {}

  @Post()
  @Auth()
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateExcepcionIngresoVisitaDto
  ) {
        
    return this.excepcionesIngresoVisitaService.create(data, user);
  }

  //BUSCAR XFECHA_EXCEPCION  - segun organismo del usuario,
  @Get('lista-fecha')  
  @Auth()
  async findXFechaExcepcion(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('fecha_excpcion', DateValidationPipe) fecha_excpcion: string   
  ) {    
        
    return this.excepcionesIngresoVisitaService.findXFechaExcepcion(fecha_excpcion, user);
  }
  //FIN BUSCAR  XFECHA_EXCEPCION....................................................

  //BUSCAR  XID CIUDADANO
  @Get('lista-xciudadano')  
  @Auth()
  async findXCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string
    
  ) {    
    
    return this.excepcionesIngresoVisitaService.findXCiudano(+id_ciudadano);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  //BUSCAR  XID CIUDADANO y FECHA ACTUAL
  @Get('lista-xciudadano-fecha-actual')  
  @Auth()
  async findXCiudadanoFechaActual(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string
    
  ) {    
    
    return this.excepcionesIngresoVisitaService.findXCiudanoFechaActual(+id_ciudadano, user);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................

  //ANULAR EXCEPCION
  @Put('anular')
  @Auth()
  updateAnular(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_excepcion', ParseIntPipe) id_excepcion: string ,
    @Body() dataDto: AnularExepcionDto
  ) {

    return this.excepcionesIngresoVisitaService.anularExcepcion(+id_excepcion, dataDto, user);
  }
  //FIN ANULAR PROHIBICION.................................

  //CUMPLIMENTAR EXCEPCION
  @Put('cumplimentar')
  @Auth()
  updateCumplimentar(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_excepcion', ParseIntPipe) id_excepcion: string ,
    @Body() dataDto: CumplimentarExepcionDto
  ) {

    return this.excepcionesIngresoVisitaService.cumplimentarExcepcion(+id_excepcion, dataDto, user);
  }
  //FIN CUMPLIMENTAR EXCEPCION.................................
}
