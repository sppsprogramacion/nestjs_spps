import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, InternalServerErrorException, NotFoundException, Put } from '@nestjs/common';
import { IngresosInternoService } from './ingresos-interno.service';
import { CreateIngresosInternoDto } from './dto/create-ingresos-interno.dto';
import { UpdateIngresosInternoDto } from './dto/update-ingresos-interno.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('ingresos-interno')
export class IngresosInternoController {
  constructor(private readonly ingresosInternoService: IngresosInternoService) {}

  @Post()
    @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
    create(
      @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
      @Body() data: CreateIngresosInternoDto
    ) {
          
      return this.ingresosInternoService.create(data, user);
    }  
  
    @Get('todos')
    @Auth(ValidRoles.superadmin)
    findAll() {
      return this.ingresosInternoService.findAll();
    }
  
    //BUSCAR  XID INTERNO
    @Get('buscar-xinterno')  
    @Auth()
    async findXInterno(
      @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
      @Query('id_interno', ParseIntPipe) id_interno: string
      
    ) {    
      
      return this.ingresosInternoService.findXInterno(+id_interno);
    }
    //FIN BUSCAR  XID CIUDADANO....................................................
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {    
      
      return this.ingresosInternoService.findOne(+id);
    }
  
    //PARA RUTA NO DEFINIDA
    @Get('*')
    rutasNoDefinidas() {
      throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
    }
    //FIN PARA RUTA NO DEFINIDA...............................
  
  
  
    @Put(':id')
    @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
    update(
      @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
      @Param('id', ParseIntPipe) id: string, 
      @Body() dataDto: UpdateIngresosInternoDto
    ) {
      
      return this.ingresosInternoService.update(+id, dataDto, user);
    }
}
