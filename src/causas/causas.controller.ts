import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, NotFoundException, Query } from '@nestjs/common';
import { CausasService } from './causas.service';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateEstablecerCondenaDto } from './dto/update-establecer-condena.dto';
import { UpdateQuitarCondenaDto } from './dto/update-quitar-condena.dto';

@Controller('causas')
export class CausasController {
  constructor(private readonly causasService: CausasService) {}

  @Post()
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateCausaDto
  ) {
        
    return this.causasService.create(data, user);
  }  

  @Get('todos')
  @Auth(ValidRoles.superadmin)
  findAll() {
    return this.causasService.findAll();
  }

  //BUSCAR  XID INGRESO
    @Get('buscar-xingreso')  
    @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
    async findXIngreso(
      @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
      @Query('id_ingreso', ParseIntPipe) id_ingreso: string
      
    ) {    
      
    return this.causasService.findXIngreso(+id_ingreso);
  }
  //FIN BUSCAR  XID INGRESO....................................................

  @Get(':id')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  findOne(@Param('id') id: string) {
    return this.causasService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...............................
  
  //ESTABLECER CONDENA
  @Put('establecer-condena')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateEstablecerCondena(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_causa', ParseIntPipe) id_causa: string ,
    @Body() dataDto: UpdateEstablecerCondenaDto
  ) {
    
    return this.causasService.establecerCondena(+id_causa, dataDto, user);
  }
  //FIN ESTABLECER CONDENA.................................

  //ESTABLECER CONDENA
  @Put('quitar-condena')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  updateQuitarCondena(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_causa', ParseIntPipe) id_causa: string ,
    @Body() dataDto: UpdateQuitarCondenaDto
  ) {
    
    return this.causasService.quitarCondena(+id_causa, dataDto, user);
  }
  //FIN ESTABLECER CONDENA.................................

  @Put(':id')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  update(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe) id: string, 
    @Body() dataDto: UpdateCausaDto
  ) {
    
    return this.causasService.update(+id, dataDto, user);
  }
  
}
