import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { DomiciliosInternoService } from './domicilios-interno.service';
import { CreateDomiciliosInternoDto } from './dto/create-domicilios-interno.dto';
import { UpdateDomiciliosInternoDto } from './dto/update-domicilios-interno.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateAnularDomicilioInternoDto } from './dto/update-anular-domicilio-interno.dto';

@Controller('domicilios-interno')
export class DomiciliosInternoController {
  constructor(private readonly domiciliosInternoService: DomiciliosInternoService) {}

  //NUEVO
  @Post()
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() data: CreateDomiciliosInternoDto
  ) {
        
    return this.domiciliosInternoService.create(data, user);
  }  
  //FIN NUEVO......................................................


  @Get()
  @Auth()
  findAll(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    
  ) {
    return this.domiciliosInternoService.findAll();
  }

  //BUSCAR  XID CIUDADANO
  @Get('buscar-xinterno')  
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  async findXInterno(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_interno', ParseIntPipe) id_interno: string    
  ) {    
    
    return this.domiciliosInternoService.findXInterno(+id_interno);
  }
  //FIN BUSCAR  XID CIUDADANO....................................................


  @Get(':id')
  @Auth()  
  findOne(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id') id: string
  ) {
    return this.domiciliosInternoService.findOne(+id);
  }

  //ANULAR TRASLADO
  @Put('anular')
  @Auth()
  updateAnular(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_domicilio', ParseIntPipe) id_domicilio: string ,
    @Body() dataDto: UpdateAnularDomicilioInternoDto
  ) {
    
    return this.domiciliosInternoService.anularDomicilio(+id_domicilio, dataDto, user);
  }
  //FIN ANULAR TRASLADO.................................
  

  @Put(':id')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  update(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id') id: string, 
    @Body() updateDomiciliosInternoDto: UpdateDomiciliosInternoDto
  ) {
    return this.domiciliosInternoService.update(+id, updateDomiciliosInternoDto, user);
  }



}
