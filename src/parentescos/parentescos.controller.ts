import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { ParentescosService } from './parentescos.service';
import { CreateParentescoDto } from './dto/create-parentesco.dto';
import { UpdateParentescoDto } from './dto/update-parentesco.dto';

@Controller('parentescos')
export class ParentescosController {
  constructor(private readonly parentescosService: ParentescosService) {}

  @Post()
  create(@Body() data: CreateParentescoDto) {
    return this.parentescosService.create(data);
  }  

  @Get('todos')
  findAll() {
    return this.parentescosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {    
    
    return this.parentescosService.findOne(id);
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
    @Body() dataDto: UpdateParentescoDto
  ) {

    return this.parentescosService.update(id, dataDto);
  }

}
