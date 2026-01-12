import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntradasSalidasService } from './entradas-salidas.service';
import { CreateEntradasSalidaDto } from './dto/create-entradas-salida.dto';
import { UpdateEntradasSalidaDto } from './dto/update-entradas-salida.dto';

@Controller('entradas-salidas')
export class EntradasSalidasController {
  constructor(private readonly entradasSalidasService: EntradasSalidasService) {}

  @Post()
  create(@Body() createEntradasSalidaDto: CreateEntradasSalidaDto) {
    return this.entradasSalidasService.create(createEntradasSalidaDto);
  }

  @Get()
  findAll() {
    return this.entradasSalidasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entradasSalidasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntradasSalidaDto: UpdateEntradasSalidaDto) {
    return this.entradasSalidasService.update(+id, updateEntradasSalidaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entradasSalidasService.remove(+id);
  }
}
