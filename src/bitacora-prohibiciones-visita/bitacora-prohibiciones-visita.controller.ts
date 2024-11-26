import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BitacoraProhibicionesVisitaService } from './bitacora-prohibiciones-visita.service';
import { CreateBitacoraProhibicionesVisitaDto } from './dto/create-bitacora-prohibiciones-visita.dto';
import { UpdateBitacoraProhibicionesVisitaDto } from './dto/update-bitacora-prohibiciones-visita.dto';

@Controller('bitacora-prohibiciones-visita')
export class BitacoraProhibicionesVisitaController {
  constructor(private readonly bitacoraProhibicionesVisitaService: BitacoraProhibicionesVisitaService) {}

  @Post()
  create(@Body() createBitacoraProhibicionesVisitaDto: CreateBitacoraProhibicionesVisitaDto) {
    //return this.bitacoraProhibicionesVisitaService.create(createBitacoraProhibicionesVisitaDto);
  }

  @Get()
  findAll() {
    return this.bitacoraProhibicionesVisitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bitacoraProhibicionesVisitaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBitacoraProhibicionesVisitaDto: UpdateBitacoraProhibicionesVisitaDto) {
    return this.bitacoraProhibicionesVisitaService.update(+id, updateBitacoraProhibicionesVisitaDto);
  }

  
}
