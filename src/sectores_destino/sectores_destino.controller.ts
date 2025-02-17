import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put, Query } from '@nestjs/common';
import { SectoresDestinoService } from './sectores_destino.service';
import { CreateSectoresDestinoDto } from './dto/create-sectores_destino.dto';
import { UpdateSectoresDestinoDto } from './dto/update-sectores_destino.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

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

  //BUSCAR  XORGANISMO DESTINO
  @Get('lista-xorganismo')  
  async findXUsuario(
    @Query('id_organismo') id_organismo: string
  ) {    
    
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;
    
    return this.sectoresDestinoService.findXOrganismo(+id_organismo,usuariox);
  }
  //FIN BUSCAR  XORGANISMO DESTINO...................................................

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
