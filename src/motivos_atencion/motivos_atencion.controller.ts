import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put, Query } from '@nestjs/common';
import { MotivosAtencionService } from './motivos_atencion.service';
import { CreateMotivosAtencionDto } from './dto/create-motivos_atencion.dto';
import { UpdateMotivosAtencionDto } from './dto/update-motivos_atencion.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('motivos-atencion')
export class MotivosAtencionController {
  constructor(private readonly motivosAtencionService: MotivosAtencionService) {}

  @Post()
  create(@Body() data: CreateMotivosAtencionDto) {
    return this.motivosAtencionService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.motivosAtencionService.findAll();
  }

  //BUSCAR  XORGANISMO DESTINO
    @Get('lista-xorganismo')  
    async findXUsuario(
      @Query('id_organismo') id_organismo: string
    ) {    
      
      let usuariox: Usuario= new Usuario;
      usuariox.id_usuario = 2;
      usuariox.organismo_id = 1;
      
      return this.motivosAtencionService.findXOrganismo(+id_organismo,usuariox);
    }
    //FIN BUSCAR  XORGANISMO DESTINO...................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.motivosAtencionService.findOne(+id);
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
    @Body() dataDto: UpdateMotivosAtencionDto
  ) {

    return this.motivosAtencionService.update(+id, dataDto);
  }

}
