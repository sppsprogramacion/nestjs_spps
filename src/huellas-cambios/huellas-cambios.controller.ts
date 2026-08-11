import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HuellasCambiosService } from './huellas-cambios.service';
import { CreateHuellasCambioDto } from './dto/create-huellas-cambio.dto';
import { UpdateHuellasCambioDto } from './dto/update-huellas-cambio.dto';

@Controller('huellas-cambios')
export class HuellasCambiosController {
  constructor(private readonly huellasCambiosService: HuellasCambiosService) {}

  @Post()
  create(@Body() createHuellasCambioDto: CreateHuellasCambioDto) {
    return this.huellasCambiosService.create(createHuellasCambioDto);
  }

  @Get()
  findAll() {
    return this.huellasCambiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.huellasCambiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHuellasCambioDto: UpdateHuellasCambioDto) {
    return this.huellasCambiosService.update(+id, updateHuellasCambioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.huellasCambiosService.remove(+id);
  }
}
