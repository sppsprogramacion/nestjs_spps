import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SexoService } from './sexo.service';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';
import { Auth, GetUser, RawHeaders } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';


@Controller('sexo')
export class SexoController {
  constructor(private readonly sexoService: SexoService) {}

  @Post()
  create(@Body() data: CreateSexoDto) {
    return this.sexoService.create(data);
  }

  @Get()  
  async findAll() {   
     
    return await this.sexoService.findAll();
  }

  // @Get()  
  // @Auth(ValidRoles.consulta)
  // async findAll(
  //   @GetUser() user: Usuario //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  // ) {
    
  //   const sexos = await this.sexoService.findAll();
  //   return {
  //     sexos,
  //     user
  //   }
  // }

  @Get('buscarTodos')  //obtener cabeceras y parametros deun usuarop(tarea)
  @UseGuards( AuthGuard() ) //para proteger ruta  
  findTodos(
    @GetUser() user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @GetUser('email') userEmail: string, //obtiene un parametro del usuario
    @RawHeaders() rawHeaders: string //obtiene la cabecera d ela peticion
  ) {
    
    const sexos = this.sexoService.findAll();
    return {
      sexos,
      user,
      userEmail,
      rawHeaders
    }
  }

  @Get('buscarTodos2')  //Custom guards y custom decorator
  @SetMetadata ('roles', ['admin','superadmin'])
  @UseGuards( AuthGuard(), UserRoleGuard ) //para proteger ruta  
  findTodos2(
    @GetUser() user: Usuario, //decorador  personalizado obtiene Usuario
   ) {
    
    const sexos = this.sexoService.findAll();
    return {
      sexos,
      user
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    
    return this.sexoService.findOne(+id);
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
    @Body() dataDto: UpdateSexoDto
  ) {
    
    return this.sexoService.update(+id, dataDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
   
    return this.sexoService.remove(+id);
  }
}
