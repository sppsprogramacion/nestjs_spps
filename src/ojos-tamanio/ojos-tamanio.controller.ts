import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OjosTamanioService } from './ojos-tamanio.service';
import { CreateOjosTamanioDto } from './dto/create-ojos-tamanio.dto';
import { UpdateOjosTamanioDto } from './dto/update-ojos-tamanio.dto';

@Controller('ojos-tamanio')
export class OjosTamanioController {
  constructor(private readonly ojosTamanioService: OjosTamanioService) {}

  @Post()
  create(@Body() createOjosTamanioDto: CreateOjosTamanioDto) {
    return this.ojosTamanioService.create(createOjosTamanioDto);
  }

  @Get()
  findAll() {
    return this.ojosTamanioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ojosTamanioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOjosTamanioDto: UpdateOjosTamanioDto) {
    return this.ojosTamanioService.update(+id, updateOjosTamanioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ojosTamanioService.remove(+id);
  }
}
