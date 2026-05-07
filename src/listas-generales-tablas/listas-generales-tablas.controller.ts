import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListasGeneralesTablasService } from './listas-generales-tablas.service';

@Controller('listas-generales-tablas')
export class ListasGeneralesTablasController {
  constructor(private readonly listasGeneralesTablasService: ListasGeneralesTablasService) {}

  @Get('tablas-alojamiento')
  async obtenerTablasAlojamiento() {
    return await this.listasGeneralesTablasService.obtenerTablasParaAlojamiento();
  }

  @Get('tablas-caracteriasticas-personales')
  async obtenerCaracteristicasPersonales() {
    return await this.listasGeneralesTablasService.obtenerCaracteristicasPersonalesTodas();
  }

  @Get('tablas-causa')
  async obtenerTablasCausa() {
    return await this.listasGeneralesTablasService.obtenerTablasParaCausa();
  }

  @Get('tablas-conducta-concepto')
  async obtenerTablasConductaConcepto() {
    return await this.listasGeneralesTablasService.obtenerTablasParaConductaConcepto();
  }

  @Get('tablas-datos-filiatorios')
  async obtenerDatosFiliatorios() {
    return await this.listasGeneralesTablasService.obtenerTablasFiliarotiosTodas();
  }

  @Get('tablas-domicilio-interno')
  async obtenerTablasDomicilioInterno() {
    return await this.listasGeneralesTablasService.obtenerTablasDomicilioInternoTodas();
  }

  @Get('tablas-egreso')
  async obtenerTablasEgreso() {
    return await this.listasGeneralesTablasService.obtenerTablasParaEgreso();
  }

  @Get('tablas-progresividad')
  async obtenerTablasProgresividad() {
    return await this.listasGeneralesTablasService.obtenerTablasParaProgresividad();
  }

  @Get('tablas-historial-procesal')
  async obtenerTablasHistorialProcesal() {
    return await this.listasGeneralesTablasService.obtenerTablasHistorialProcesalTodas();
  }

  @Get('tablas-ingreso-interno')
  async obtenerTablasIngresoInterno() {
    return await this.listasGeneralesTablasService.obtenerTablasParaIngresoInterno();
  }
  
}
