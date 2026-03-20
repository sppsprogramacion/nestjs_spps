import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { HistorialProcesalService } from './historial-procesal.service';
import { CreateHistorialProcesalDto } from './dto/create-historial-procesal.dto';
import { UpdateHistorialProcesalDto } from './dto/update-historial-procesal.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('historial-procesal')
export class HistorialProcesalController {
  constructor(private readonly historialProcesalService: HistorialProcesalService) {}

  @Post()
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateHistorialProcesalDto
  ) {
    
    return this.historialProcesalService.createDesdeController(data, user);
  }  

  //BUSCAR  XID INGRESO
  @Get('lista-xingreso')  
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  async findXCiudadano(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string    
  ) {    
    
    return this.historialProcesalService.findXIngreso(+id_ingreso);
  }
  //FIN BUSCAR  XID INGRESO....................................................

  @Get(':id')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  findOne(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id') id: string
  ) {
    return this.historialProcesalService.findOne(+id);
  }
  
}
