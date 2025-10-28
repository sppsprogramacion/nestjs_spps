import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaracteristicasPersonalesService } from './caracteristicas-personales.service';
import { CreateCaracteristicasPersonaleDto } from './dto/create-caracteristicas-personale.dto';
import { UpdateCaracteristicasPersonaleDto } from './dto/update-caracteristicas-personale.dto';

@Controller('caracteristicas-personales')
export class CaracteristicasPersonalesController {
  constructor(private readonly caracteristicasPersonalesService: CaracteristicasPersonalesService) {}

  @Get('todos')
  async obtenerTodas() {
    return await this.caracteristicasPersonalesService.obtenerTodas();
  }
}
