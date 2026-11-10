import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ParseIntPipe } from '@nestjs/common';
import { ParentescosMenoresPrincipalesService } from './parentescos_menores_principales.service';
import { CreateParentescosMenoresPrincipaleDto } from './dto/create-parentescos_menores_principale.dto';
import { UpdateParentescosMenoresPrincipaleDto } from './dto/update-parentescos_menores_principale.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Controller('parentescos-menores-principales')
export class ParentescosMenoresPrincipalesController {
  constructor(private readonly parentescosMenoresPrincipalesService: ParentescosMenoresPrincipalesService) {}

  @Post()
  @Auth(ValidRoles.restriccionAdmin, ValidRoles.restriccionOperador, ValidRoles.superAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() createRequisitosVisitaDto: CreateParentescosMenoresPrincipaleDto
  ) {

    return this.parentescosMenoresPrincipalesService.create(createRequisitosVisitaDto, user);
  }

  @Get('lista-organismo')
  @Auth(ValidRoles.superAdmin)
  findListaXOrganismo(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    
  ) {

    return this.parentescosMenoresPrincipalesService.findListaXOrganismo(user);
  }

  @Get('todos')
  @Auth(ValidRoles.superAdmin)
  findAll(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    
  ) {
    return this.parentescosMenoresPrincipalesService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id') id: string
  ) {
    return this.parentescosMenoresPrincipalesService.findOne(+id);
  }

  @Put('quitar-parentesco')
  @Auth(ValidRoles.superAdmin, ValidRoles.restriccionAdmin, ValidRoles.restriccionOperador)
  updateQuitarParentesco(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_registro', ParseIntPipe) id_registro: string ,
  ) {
    
    return this.parentescosMenoresPrincipalesService.updateQuitarParentesco(+id_registro, user);
  }
}
