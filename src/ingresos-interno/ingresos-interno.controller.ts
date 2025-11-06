import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngresosInternoService } from './ingresos-interno.service';
import { CreateIngresosInternoDto } from './dto/create-ingresos-interno.dto';
import { UpdateIngresosInternoDto } from './dto/update-ingresos-interno.dto';

@Controller('ingresos-interno')
export class IngresosInternoController {
  constructor(private readonly ingresosInternoService: IngresosInternoService) {}

  @Post()
  create(@Body() createIngresosInternoDto: CreateIngresosInternoDto) {
    return this.ingresosInternoService.create(createIngresosInternoDto);
  }

  @Get()
  findAll() {
    return this.ingresosInternoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingresosInternoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIngresosInternoDto: UpdateIngresosInternoDto) {
    return this.ingresosInternoService.update(+id, updateIngresosInternoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingresosInternoService.remove(+id);
  }
}
