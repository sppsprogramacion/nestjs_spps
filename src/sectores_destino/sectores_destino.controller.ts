import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { SectoresDestinoService } from './sectores_destino.service';
import { CreateSectoresDestinoDto } from './dto/create-sectores_destino.dto';
import { UpdateSectoresDestinoDto } from './dto/update-sectores_destino.dto';

@Controller('sectores-destino')
export class SectoresDestinoController {
  constructor(private readonly sectoresDestinoService: SectoresDestinoService) {}

  @Post()
  create(@Body() data: CreateSectoresDestinoDto) {
    return this.sectoresDestinoService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.sectoresDestinoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.sectoresDestinoService.findOne(+id);
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
    @Body() dataDto: UpdateSectoresDestinoDto
  ) {

    return this.sectoresDestinoService.update(+id, dataDto);
  }

}
