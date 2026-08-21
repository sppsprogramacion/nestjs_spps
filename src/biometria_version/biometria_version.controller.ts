import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiometriaVersionService } from './biometria_version.service';
import { CreateBiometriaVersionDto } from './dto/create-biometria_version.dto';
import { UpdateBiometriaVersionDto } from './dto/update-biometria_version.dto';

@Controller('biometria-version')
export class BiometriaVersionController {
  constructor(private readonly biometriaVersionService: BiometriaVersionService) {}

  @Post()
  create(@Body() createBiometriaVersionDto: CreateBiometriaVersionDto) {
    return this.biometriaVersionService.create(createBiometriaVersionDto);
  }

  @Get()
  findAll() {
    return this.biometriaVersionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.biometriaVersionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBiometriaVersionDto: UpdateBiometriaVersionDto) {
    return this.biometriaVersionService.update(+id, updateBiometriaVersionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.biometriaVersionService.remove(+id);
  }
}
