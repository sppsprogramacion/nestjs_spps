import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { PrisionReclusionService } from './prision-reclusion.service';
import { CreatePrisionReclusionDto } from './dto/create-prision-reclusion.dto';
import { UpdatePrisionReclusionDto } from './dto/update-prision-reclusion.dto';

@Controller('prision-reclusion')
export class PrisionReclusionController {
  constructor(private readonly prisionReclusionService: PrisionReclusionService) {}

  @Post()
  create(@Body() data: CreatePrisionReclusionDto) {
    return this.prisionReclusionService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.prisionReclusionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    return this.prisionReclusionService.findOne(id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() dataDto: UpdatePrisionReclusionDto
  ) {

    return this.prisionReclusionService.update(id, dataDto);
  }
}
