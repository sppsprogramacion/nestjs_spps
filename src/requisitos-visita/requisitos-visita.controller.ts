import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequisitosVisitaService } from './requisitos-visita.service';
import { CreateRequisitosVisitaDto } from './dto/create-requisitos-visita.dto';
import { UpdateRequisitosVisitaDto } from './dto/update-requisitos-visita.dto';

@Controller('requisitos-visita')
export class RequisitosVisitaController {
  constructor(private readonly requisitosVisitaService: RequisitosVisitaService) {}

  @Post()
  create(@Body() createRequisitosVisitaDto: CreateRequisitosVisitaDto) {
    return this.requisitosVisitaService.create(createRequisitosVisitaDto);
  }

  @Get()
  findAll() {
    return this.requisitosVisitaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requisitosVisitaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequisitosVisitaDto: UpdateRequisitosVisitaDto) {
    return this.requisitosVisitaService.update(+id, updateRequisitosVisitaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requisitosVisitaService.remove(+id);
  }
}
