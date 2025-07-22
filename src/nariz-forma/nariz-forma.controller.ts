import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { NarizFormaService } from './nariz-forma.service';
import { CreateNarizFormaDto } from './dto/create-nariz-forma.dto';
import { UpdateNarizFormaDto } from './dto/update-nariz-forma.dto';

@Controller('nariz-forma')
export class NarizFormaController {
  constructor(private readonly narizFormaService: NarizFormaService) {}

  @Post()
    create(@Body() data: CreateNarizFormaDto) {
      return this.narizFormaService.create(data);
    }  
  
    @Get('todos')
    findAll() {
      return this.narizFormaService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {    
      
      return this.narizFormaService.findOne(id);
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
      @Body() dataDto: UpdateNarizFormaDto
    ) {
  
      return this.narizFormaService.update(id, dataDto);
    }
}
