import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrimestresService } from './trimestres.service';
import { CreateTrimestreDto } from './dto/create-trimestre.dto';
import { UpdateTrimestreDto } from './dto/update-trimestre.dto';

@Controller('trimestres')
export class TrimestresController {
  constructor(private readonly trimestresService: TrimestresService) {}

  @Post()
  create(@Body() createTrimestreDto: CreateTrimestreDto) {
    return this.trimestresService.create(createTrimestreDto);
  }

  @Get()
  findAll() {
    return this.trimestresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trimestresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrimestreDto: UpdateTrimestreDto) {
    return this.trimestresService.update(+id, updateTrimestreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trimestresService.remove(+id);
  }
}
