import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put, ParseIntPipe } from '@nestjs/common';
import { MotivosEgresoService } from './motivos-egreso.service';
import { CreateMotivosEgresoDto } from './dto/create-motivos-egreso.dto';
import { UpdateMotivosEgresoDto } from './dto/update-motivos-egreso.dto';
import { Auth } from 'src/auth/decorators';

@Controller('motivos-egreso')
export class MotivosEgresoController {
  constructor(private readonly motivosEgresoService: MotivosEgresoService) {}

  @Post()
  create(@Body() data: CreateMotivosEgresoDto) {
    return this.motivosEgresoService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.motivosEgresoService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.motivosEgresoService.findOne(+id);
  }
  
  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateMotivosEgresoDto
  ) {

    return this.motivosEgresoService.update(+id, dataDto);
  }
}
