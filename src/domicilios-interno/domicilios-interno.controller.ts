import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DomiciliosInternoService } from './domicilios-interno.service';
import { CreateDomiciliosInternoDto } from './dto/create-domicilios-interno.dto';
import { UpdateDomiciliosInternoDto } from './dto/update-domicilios-interno.dto';

@Controller('domicilios-interno')
export class DomiciliosInternoController {
  constructor(private readonly domiciliosInternoService: DomiciliosInternoService) {}

  @Post()
  create(@Body() createDomiciliosInternoDto: CreateDomiciliosInternoDto) {
    return this.domiciliosInternoService.create(createDomiciliosInternoDto);
  }

  @Get()
  findAll() {
    return this.domiciliosInternoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domiciliosInternoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomiciliosInternoDto: UpdateDomiciliosInternoDto) {
    return this.domiciliosInternoService.update(+id, updateDomiciliosInternoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domiciliosInternoService.remove(+id);
  }
}
