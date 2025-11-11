import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListasGeneralesTablasService } from './listas-generales-tablas.service';

@Controller('listas-generales-tablas')
export class ListasGeneralesTablasController {
  constructor(private readonly listasGeneralesTablasService: ListasGeneralesTablasService) {}

  @Get('tablas-caracteriasticas-personales')
  async obtenerCaracteristicasPersonales() {
    return await this.listasGeneralesTablasService.obtenerCaracteristicasPersonalesTodas();
  }

  @Get('tablas-datos-filiatorios')
  async obtenerDatosFiliatorios() {
    return await this.listasGeneralesTablasService.obtenerTablasFiliarotiosTodas();
  }

  @Get('tablas-ingreso-interno')
  async obtenerTablasIngresoInterno() {
    return await this.listasGeneralesTablasService.obtenerTablasParaIngresoInterno();
  }
}
