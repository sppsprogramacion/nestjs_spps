import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { OrganismosExternosService } from './organismos-externos.service';
import { CreateOrganismosExternoDto } from './dto/create-organismos-externo.dto';
import { UpdateOrganismosExternoDto } from './dto/update-organismos-externo.dto';

@Controller('organismos-externos')
export class OrganismosExternosController {
  constructor(private readonly organismosExternosService: OrganismosExternosService) {}

  @Post()
    create(@Body() data: CreateOrganismosExternoDto) {
      return this.organismosExternosService.create(data);
    }  
  
    @Get('todos')
    findAll() {
      return this.organismosExternosService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {    
      
      return this.organismosExternosService.findOne(+id);
    }
  
    //PARA RUTA NO DEFINIDA
    @Get('*')
    rutasNoDefinidas() {
      throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
    }
    //FIN PARA RUTA NO DEFINIDA...........
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: string, 
      @Body() dataDto: UpdateOrganismosExternoDto
    ) {
  
      return this.organismosExternosService.update(+id, dataDto);
    }
     
}
