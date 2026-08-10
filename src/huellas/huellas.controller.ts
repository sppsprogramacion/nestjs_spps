import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HuellasService } from './huellas.service';
import { CreateHuellaDto } from './dto/create-huella.dto';
import { UpdateHuellaDto } from './dto/update-huella.dto';

@Controller('huellas')
export class HuellasController {
  constructor(private readonly huellasService: HuellasService) {}

  @Post()
  create(@Body() createHuellaDto: CreateHuellaDto) {
    return this.huellasService.create(createHuellaDto);
  }

  @Get()
  findAll() {
    return this.huellasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.huellasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHuellaDto: UpdateHuellaDto) {
    return this.huellasService.update(+id, updateHuellaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.huellasService.remove(+id);
  }
}
