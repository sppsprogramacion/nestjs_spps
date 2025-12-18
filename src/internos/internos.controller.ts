import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, NotFoundException, Put, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { Auth, GetUser } from 'src/auth/decorators';
import { CreateInternoDto } from './dto/create-interno.dto';
import { InternosService } from './internos.service';
import { UpdateInternoDto } from './dto/update-interno.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateInternoUnidadDto } from './dto/create-interno-unidad.dto';
import { ValidRoles } from 'src/auth/interfaces';
import { UpdateInternoDatosPersonalesDto } from './dto/update-interno-datospersonales.dto';
import { UpdateInternoCaracteristicasPersonalesDto } from './dto/update-interno-caracteristicaspersonales.dto';
import { UpdateInternoDatosFiliatoriosDto } from './dto/update-interno-datosfiliatorios.dto';

@Controller('internos')
export class InternosController {
  constructor(
    private readonly internosService: InternosService,
    private readonly driveImagenesService: DriveImagenesService
  ) {}

  @Post('upload-img-interno')
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  async uploadFileInterno(
    @UploadedFile() file: Express.Multer.File,
    @Query('id_interno', ParseIntPipe) id_interno: string
  ) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    const uploadedFile = await this.driveImagenesService.uploadFile(file, "interno", +id_interno);
    return {
      message: 'Archivo subido con éxito',
      fileId: uploadedFile.id,
      link: uploadedFile.webViewLink,
    };
  }

  @Post()
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  create(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Body() createDto: CreateInternoUnidadDto) {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    createDto.fecha_carga = fecha_actual;  
    createDto.foto = "foto-interno-0.jpg";
        
    return this.internosService.create(createDto, user);
  }

  @Get('todos')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  findAll(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
  ) {
    return this.internosService.findAll();
  }

  //BUSCAR X PRONTUARIO
  @Get('buscar-xprontuario')  
  @Auth()
  async findInternoXProntuario(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('prontuario', ParseIntPipe) prontuario: string, 
  ) {    
    
    return this.internosService.findXProntuario(+prontuario);
  }
  //FIN BUSCAR CIUDADANO X DNI...........................................

  //BUSCAR X CODIGO
  @Get('buscar-xcodigo')  
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  async findInternoXCodigo(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('codigo') codigo: string, 
  ) {    
    
    return this.internosService.findXCodigo(codigo);
  }
  //FIN BUSCAR CIUDADANO X DNI...........................................


  //BUSCAR LISTA X PRONTUARIO
  @Get('buscarlista-xprontuario')  
  @Auth()
  async findListaXDni(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('prontuario', ParseIntPipe) prontuario: string, 
  ) {    
    
    return this.internosService.findListaXProntuario(+prontuario);
  }
  //FIN BUSCAR LISTA X PRONTUARIO...........................................
  
  //BUSCAR LISTA X APELLIDO
  @Get('buscarlista-xapellido')  
  @Auth()
  async findListaXApellido(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('apellido') apellido: string, 
  ) {    
    
    if ( apellido.length < 2 ) throw new NotFoundException('El apellido de busqueda debe tener mínimo (02) dos caracteres.');
          
    let id_organismo = user.organismo_id;
    return this.internosService.findListaXApellido(apellido,id_organismo);
  }
  //FIN BUSCAR LISTA X APELLIDO...........................................

  //BUSCAR LISTA X APELLIDO GENERAL
  @Get('buscarlista-xapellido-gral')
  @Auth()  
  async findListaXApellidoGeneral(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('apellido') apellido: string, 
  ) {    
    
    if ( apellido.length < 2 ) throw new NotFoundException('El apellido de busqueda debe tener mínimo (02) dos caracteres.');
         
    return this.internosService.findListaXApellidoGeneral(apellido);
  }
  //FIN BUSCAR LISTA X APELLIDO...........................................

  @Get(':id')
  @Auth()  
  findOne(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe
  ) id: string) {
    
    return this.internosService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........


  //MODIFICAR DATOS PERSONALES
  @Put('update-datos-personales')
  @Auth()
  updateDatosPersonales(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_interno', ParseIntPipe) id_interno: string ,
    @Body() dataDto: UpdateInternoDatosPersonalesDto
  ) {

    //domicilio: para que solo se modifiquen los datos de domicilio e identificar
    //que se guarde en tabla domicilios_ciudadano
    return this.internosService.update(+id_interno, dataDto, user);
  }
  //FIN MODIFICAR DATOS PERSONALES...........................................

  //MODIFICAR CARACTERISTICAS PERSONALES
  @Put('update-caracteristicas-personales')
  @Auth()
  updateCaracteristicasPersonales(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_interno', ParseIntPipe) id_interno: string ,
    @Body() dataDto: UpdateInternoCaracteristicasPersonalesDto
  ) {

    //domicilio: para que solo se modifiquen los datos de domicilio e identificar
    //que se guarde en tabla domicilios_ciudadano
    return this.internosService.update(+id_interno, dataDto, user);
  }
  //FIN MODIFICAR CARACTERISTICAS PERSONALES...........................................

  //MODIFICAR DATOS FILIATORIOS
  @Put('update-datos-filiatorios')
  @Auth()
  updateDatosFiliatorios(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_interno', ParseIntPipe) id_interno: string ,
    @Body() dataDto: UpdateInternoDatosFiliatoriosDto
  ) {

    //domicilio: para que solo se modifiquen los datos de domicilio e identificar
    //que se guarde en tabla domicilios_ciudadano
    return this.internosService.update(+id_interno, dataDto, user);
  }
  //FIN MODIFICAR DATOS FILIATORIOS...........................................
  

  //EDITAR
  @Put(':id')
  @Auth(ValidRoles.judicialOperador, ValidRoles.judicialAdmin)
  update(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Param('id', ParseIntPipe) id: string,  
    @Body() UpdateInternoDto: UpdateInternoDto
  ) {
    
    return this.internosService.update(+id, UpdateInternoDto,user);
  }
  //FIN EDITAR........................................................

}
