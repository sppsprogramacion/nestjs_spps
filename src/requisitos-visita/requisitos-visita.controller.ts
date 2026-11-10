import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { RequisitosVisitaService } from './requisitos-visita.service';
import { CreateRequisitoVisitaDto } from './dto/create-requisitos-visita.dto';
import { UpdateRequisitoVisitaDto } from './dto/update-requisitos-visita.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('requisitos-visita')
export class RequisitosVisitaController {
  constructor(private readonly requisitosVisitaService: RequisitosVisitaService) {}

  @Post()
  @Auth(ValidRoles.superAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() createRequisitosVisitaDto: CreateRequisitoVisitaDto
  ) {
    return this.requisitosVisitaService.create(createRequisitosVisitaDto);
  }

  @Get('todos')
  @Auth(ValidRoles.superAdmin)
  findAll(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    
  ) {
    return this.requisitosVisitaService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id') id: string
  ) {
    return this.requisitosVisitaService.findOne(+id);
  }

  @Put('actualizar-cantidades')
  @Auth(ValidRoles.superAdmin, ValidRoles.restriccionAdmin, ValidRoles.restriccionOperador)
  update(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_requisito', ParseIntPipe) id_requisito: string ,
    @Body() dataDto: UpdateRequisitoVisitaDto
  ) {
    
    return this.requisitosVisitaService.updateCantidades(+id_requisito, dataDto, user);
  }

  
}
