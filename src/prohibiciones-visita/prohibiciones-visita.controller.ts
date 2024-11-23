import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProhibicionesVisitaService } from './prohibiciones-visita.service';
import { CreateProhibicionesVisitaDto } from './dto/create-prohibiciones-visita.dto';
import { UpdateProhibicionesVisitaDto } from './dto/update-prohibiciones-visita.dto';

@Controller('prohibiciones-visita')
export class ProhibicionesVisitaController {
  constructor(private readonly prohibicionesVisitaService: ProhibicionesVisitaService) {}

  @Post()
  create(@Body() createProhibicionesVisitaDto: CreateProhibicionesVisitaDto) {
    return this.prohibicionesVisitaService.create(createProhibicionesVisitaDto);
  }

  @Get()
  findAll() {
    return this.prohibicionesVisitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prohibicionesVisitaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProhibicionesVisitaDto: UpdateProhibicionesVisitaDto) {
    return this.prohibicionesVisitaService.update(+id, updateProhibicionesVisitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prohibicionesVisitaService.remove(+id);
  }
}
