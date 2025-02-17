import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { OrganismosDestinoService } from './organismos_destino.service';
import { CreateOrganismosDestinoDto } from './dto/create-organismos_destino.dto';
import { UpdateOrganismosDestinoDto } from './dto/update-organismos_destino.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('organismos-destino')
export class OrganismosDestinoController {
  constructor(private readonly organismosDestinoService: OrganismosDestinoService) {}

  @Post()
  create(@Body() data: CreateOrganismosDestinoDto) {
    return this.organismosDestinoService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.organismosDestinoService.findAll();
  }

  //BUSCAR  XORGANISMO DEL USUARIO
  @Get('lista-xusuario')  
  async findXUsuario() {    
    
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;
    
    return this.organismosDestinoService.findXUsuario(usuariox);
  }
  //FIN BUSCAR  XORGANISMO DEL USUARIO....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.organismosDestinoService.findOne(+id);
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
    @Body() dataDto: UpdateOrganismosDestinoDto
  ) {

    return this.organismosDestinoService.update(+id, dataDto);
  }
  
}
