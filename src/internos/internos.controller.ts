import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InternosService } from './internos.service';
import { CreateInternoDto } from './dto/create-interno.dto';
import { UpdateInternoDto } from './dto/update-interno.dto';

@Controller('internos')
export class InternosController {
  constructor(private readonly internosService: InternosService) {}

  @Post()
  create(@Body() createInternoDto: CreateInternoDto) {
    return this.internosService.create(createInternoDto);
  }

  @Get()
  findAll() {
    return this.internosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.internosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInternoDto: UpdateInternoDto) {
    return this.internosService.update(+id, updateInternoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.internosService.remove(+id);
  }
}
