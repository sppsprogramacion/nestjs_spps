import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, NotFoundException, Put } from '@nestjs/common';
import { TrasladosInternoService } from './traslados-interno.service';
import { CreateTrasladosInternoDto } from './dto/create-traslados-interno.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ValidRoles } from 'src/auth/interfaces';
import { UpdateProcesarTrasladoDto } from './dto/update-procesar-traslado.dto';

@Controller('traslados-interno')
export class TrasladosInternoController {
  constructor(private readonly trasladosInternoService: TrasladosInternoService) {}
  
  //NUEVO
  @Post()
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateTrasladosInternoDto
  ) {
        
    return this.trasladosInternoService.create(data, user);
  }  
  //FIN NUEVO......................................................

  //TODOS
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  @Get('todos')
  findAll(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {

    return this.trasladosInternoService.findAll();
  }
  //FIN TODOS............................................

  //BUSCAR  XID INGRESO
  @Get('buscar-xingreso')  
  @Auth()
  async findXIngreso(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_ingreso', ParseIntPipe) id_ingreso: string
    
  ) {    
    
    return this.trasladosInternoService.findXIngreso(+id_ingreso);
  }
  //FIN BUSCAR  XID INGRESO....................................................

  //BUSCAR X MI ORGANISMO
  @Get('buscar-miorganismo')  
  @Auth()
  async findMiOrganismo(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    
  ) {    
    
    return this.trasladosInternoService.findXMiOrganismo(+user.organismo_id);
  }  
  //FIN BUSCAR  X MI ORGANISMO....................................................

  //BUSCAR  PENDIENTES X MI ORGANISMO
  @Get('buscar-pendientes-miorganismo')  
  @Auth()
  async findPendientesMiOrganismo(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    
  ) {    
    
    return this.trasladosInternoService.findPendientesXOrganismo(+user.organismo_id);
  }  
  //FIN BUSCAR  X MI ORGANISMO....................................................

  //BUSCAR  PENDIENTES X ORGANISMO
  @Get('buscar-pendientes-xorganismo')  
  @Auth()
  async findPendientesXOrganismo(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_organismo', ParseIntPipe) id_organismo: string
    
  ) {    
    
    return this.trasladosInternoService.findPendientesXOrganismo(+id_organismo);
  }  
  //FIN BUSCAR  X ORGANISMO....................................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {    
    
    return this.trasladosInternoService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...............................

  //ANULAR TRASLADO
  @Put('anular')
  @Auth()
  updateAnular(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_traslado', ParseIntPipe) id_traslado: string ,
    @Body() dataDto: UpdateProcesarTrasladoDto
  ) {
    
    return this.trasladosInternoService.anularTraslado(+id_traslado, dataDto, user);
  }
  //FIN ANULAR TRAS.................................

  //ACEPTAR TRASLADO
  @Put('aceptar')
  @Auth()
  updateAceptar(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_traslado', ParseIntPipe) id_traslado: string ,
    @Body() dataDto: UpdateProcesarTrasladoDto
  ) {
    
    return this.trasladosInternoService.cumplimentarTraslado(+id_traslado, dataDto, "aceptar", user);
  }
  //FIN ACEPTAR TRASLADO.................................

  //RECHAZAR TRASLADO
  @Put('rechazar')
  @Auth()
  updateRechazar(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_traslado', ParseIntPipe) id_traslado: string ,
    @Body() dataDto: UpdateProcesarTrasladoDto
  ) {
    
    return this.trasladosInternoService.cumplimentarTraslado(+id_traslado, dataDto, "rechazar", user);
  }
  //FIN RECHAZAR TRASLADO.................................

  // @Put(':id')
  // @Auth()
  // update(
  //   @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  //   @Param('id', ParseIntPipe) id: string, 
  //   @Body() dataDto: UpdateTrasladosInternoDto
  // ) {
    
  //   return this.trasladosInternoService.update(+id, dataDto, user);
  // }
  
}
