import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenoresACargoService } from './menores_a_cargo.service';
import { CreateMenoresACargoDto } from './dto/create-menores_a_cargo.dto';
import { UpdateMenoresACargoDto } from './dto/update-menores_a_cargo.dto';

@Controller('menores-a-cargo')
export class MenoresACargoController {
  constructor(private readonly menoresACargoService: MenoresACargoService) {}

  @Post()
  create(@Body() createMenoresACargoDto: CreateMenoresACargoDto) {
    return this.menoresACargoService.create(createMenoresACargoDto);
  }

  @Get()
  findAll() {
    return this.menoresACargoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menoresACargoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenoresACargoDto: UpdateMenoresACargoDto) {
    return this.menoresACargoService.update(+id, updateMenoresACargoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menoresACargoService.remove(+id);
  }
}
