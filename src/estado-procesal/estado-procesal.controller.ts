import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { EstadoProcesalService } from './estado-procesal.service';
import { CreateEstadoProcesalDto } from './dto/create-estado-procesal.dto';
import { UpdateEstadoProcesalDto } from './dto/update-estado-procesal.dto';

@Controller('estado-procesal')
export class EstadoProcesalController {
  constructor(private readonly estadoProcesalService: EstadoProcesalService) {}

  @Post()
  create(@Body() data: CreateEstadoProcesalDto) {
    return this.estadoProcesalService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.estadoProcesalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    return this.estadoProcesalService.findOne(id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() dataDto: UpdateEstadoProcesalDto
  ) {

    return this.estadoProcesalService.update(id, dataDto);
  }
}
