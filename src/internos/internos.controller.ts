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
import { isNotEmpty } from 'class-validator';

@Controller('internos')
export class InternosController {
  constructor(
    private readonly internosService: InternosService,
    private readonly driveImagenesService: DriveImagenesService
  ) {}

  // @Post('upload-img-interno')
  // @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  // async uploadFileInterno(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Query('id_interno', ParseIntPipe) id_interno: string
  // ) {
  //   if (!file) {
  //     throw new BadRequestException('No se recibió ningún archivo');
  //   }

  //   const uploadedFile = await this.driveImagenesService.uploadFile(file, "interno", +id_interno);
  //   return {
  //     message: 'Archivo subido con éxito',
  //     fileId: uploadedFile.id,
  //     link: uploadedFile.webViewLink,
  //   };
  // }

  @Post('upload-img-interno')
  @Auth()
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_interno', ParseIntPipe) id_interno: string,
    @Query('tipo_perfil') tipo_perfil: string,
  ) {

    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    if(!isNotEmpty(tipo_perfil)){
      throw new NotFoundException("Debe ingresar un valor valido <<FF,FPD o FPI>>.");
    }

    if(tipo_perfil != "FF" && tipo_perfil != "FPD" && tipo_perfil != "FPI"){
      throw new NotFoundException("El valor enviado debe ser valido <<FF,FPD o FPI>>.");
    }

    let internoImagen: UpdateInternoDto= new UpdateInternoDto;
    //controlar si exite el ciudadano
    let interno = await this.internosService.findOne(+id_interno);
    
    //Controlar si tiene o no imagen cargada
    let foto_nombre ="";
    foto_nombre = "foto-interno-" + id_interno+ "-" + tipo_perfil + ".jpg";
    
    let existeFile: boolean = await this.driveImagenesService.existeFileByName(foto_nombre, "interno");
    if(existeFile) throw new NotFoundException("El interno tiene una imagen cargada para " + tipo_perfil);
    
    //guardar imagen
    const uploadedFile = await this.driveImagenesService.uploadFileInterno(file, "interno", foto_nombre, +id_interno);
    
    //modificar nombre de la imagen en el interno
    if(uploadedFile){
      if(tipo_perfil == "FF"){
        internoImagen.foto = foto_nombre;
      }
      if(tipo_perfil == "FPI"){
        internoImagen.fotoPI = foto_nombre;
      }
      if(tipo_perfil == "FPD"){
        internoImagen.fotoPD = foto_nombre;
      }

      await this.internosService.update(+id_interno,internoImagen,user,"NUEVA FOTO " + tipo_perfil);
    }
    

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
    return this.internosService.update(+id_interno, dataDto, user, "ACTUALIZACION DATOS PERSONALES");
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
    return this.internosService.update(+id_interno, dataDto, user, "ACTUALIZACION CARACTERISTICAS PERSONALES");
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
    return this.internosService.update(+id_interno, dataDto, user, "ACTUALIZACION DATOS FILIATORIOS");
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
    
    return this.internosService.update(+id, UpdateInternoDto,user, "EDICION DE DATOS");
  }
  //FIN EDITAR........................................................

  //QUITAR IMAGEN
  @Delete('quitar-imagen')
  @Auth()
  async deleteImagenes(
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('id_interno', ParseIntPipe) id_interno: string,    
    @Query('tipo_perfil') tipo_perfil: string,
  ) {

    if(!isNotEmpty(tipo_perfil)){
      throw new NotFoundException("Debe ingresar un valor valido <<FF,FPD o FPI>>.");
    }

    if(tipo_perfil != "FF" && tipo_perfil != "FPD" && tipo_perfil != "FPI"){
      throw new NotFoundException("El valor enviado debe ser valido <<FF,FPD o FPI>>.");
    }

    
    let fileName = "foto-interno-" + id_interno + "-" + tipo_perfil + ".jpg";;

    let eliminadoFile: boolean = await this.driveImagenesService.deleteAllFilesByName(fileName, "interno");
    if(!eliminadoFile) throw new NotFoundException("La imagen no se elimino correctamente");
    
    //modificar nombre de la imagen en el interno
    if(eliminadoFile){
      let internoImagen: UpdateInternoDto= new UpdateInternoDto;
      if(tipo_perfil == "FF"){
        internoImagen.foto = "foto-interno-FF-0.jpg";
      }
      if(tipo_perfil == "FPI"){
        internoImagen.fotoPI = "foto-interno-PI-0.jpg";
      }
      if(tipo_perfil == "FPD"){
        internoImagen.fotoPD = "foto-interno-PD-0.jpg";
      }

      await this.internosService.update(+id_interno,internoImagen,user, "QUITAR FOTO " + tipo_perfil);
    }

    return {
      message: 'Imagen eliminada correctamente',
      eliminado: true,
    };
  }

}
