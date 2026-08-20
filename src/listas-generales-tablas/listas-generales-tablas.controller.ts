import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListasGeneralesTablasService } from './listas-generales-tablas.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('listas-generales-tablas')
export class ListasGeneralesTablasController {
  constructor(private readonly listasGeneralesTablasService: ListasGeneralesTablasService) {}

  @Auth()
  @Get('tablas-alojamiento')
  async obtenerTablasAlojamiento(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerTablasParaAlojamiento(user);
  }

  @Auth()
  @Get('tablas-caracteriasticas-personales')
  async obtenerCaracteristicasPersonales(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerCaracteristicasPersonalesTodas();
  }

  @Auth()
  @Get('tablas-causa')
  async obtenerTablasCausa(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerTablasParaCausa();
  }

  @Auth()
  @Get('tablas-conducta-concepto')
  async obtenerTablasConductaConcepto(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerTablasParaConductaConcepto();
  }

  @Auth()
  @Get('tablas-datos-filiatorios')
  async obtenerDatosFiliatorios(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerTablasFiliarotiosTodas();
  }

  @Auth()
  @Get('tablas-domicilio-interno')
  async obtenerTablasDomicilioInterno(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerTablasDomicilioInternoTodas();
  }

  @Auth()
  @Get('tablas-egreso')
  async obtenerTablasEgreso(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerTablasParaEgreso();
  }

  @Auth()
  @Get('tablas-progresividad')
  async obtenerTablasProgresividad(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerTablasParaProgresividad();
  }

  @Auth()
  @Get('tablas-historial-procesal')
  async obtenerTablasHistorialProcesal(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerTablasHistorialProcesalTodas();
  }

  @Auth()
  @Get('tablas-ingreso-interno')
  async obtenerTablasIngresoInterno(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return await this.listasGeneralesTablasService.obtenerTablasParaIngresoInterno();
  }
  
}
