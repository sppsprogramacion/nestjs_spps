import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitasInternosService } from './visitas-internos.service';
import { CreateVisitasInternoDto } from './dto/create-visitas-interno.dto';
import { UpdateVisitasInternoDto } from './dto/update-visitas-interno.dto';

@Controller('visitas-internos')
export class VisitasInternosController {
  constructor(private readonly visitasInternosService: VisitasInternosService) {}

  @Post()
  create(@Body() createVisitasInternoDto: CreateVisitasInternoDto) {
    return this.visitasInternosService.create(createVisitasInternoDto);
  }

  @Get()
  findAll() {
    return this.visitasInternosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitasInternosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitasInternoDto: UpdateVisitasInternoDto) {
    return this.visitasInternosService.update(+id, updateVisitasInternoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitasInternosService.remove(+id);
  }
}
