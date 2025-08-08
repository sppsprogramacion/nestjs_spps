import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ParseIntPipe, Query, Put, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CiudadanosService } from './ciudadanos.service';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { EstablecerVisitaDto } from './dto/establecer-visita.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { UpdateDatosPersonalesCiudadanoDto } from './dto/update-datos-personales-ciudadno.dto';
import { UpdateDomicilioCiudadanoDto } from './dto/update-domicilio-ciudadano.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';
import { Ciudadano } from './entities/ciudadano.entity';

@Controller('ciudadanos')
export class CiudadanosController {
  constructor(
    private readonly ciudadanosService: CiudadanosService,
    private readonly driveImagenesService: DriveImagenesService
  ) {}

  @Post('upload-img-ciudadano')
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    let ciudadanoImagen: UpdateCiudadanoDto= new UpdateCiudadanoDto;
    //controlar si exite el ciudadano
    let ciudadano = await this.findOne(id_ciudadano);
    
    //Controlar si tiene o no imagen cargada
    let foto_nombre = "foto-ciudadano-" + id_ciudadano + ".jpg";
    let existeFile: boolean = await this.driveImagenesService.existeFileByName(foto_nombre, "ciudadano");
    if(existeFile) throw new NotFoundException("El ciudadano tiene una imagen cargada.");
    
    //guardar imagen
    const uploadedFile = await this.driveImagenesService.uploadFile(file, "ciudadano", +id_ciudadano);
    
    //modificar nombre de la imagen en el ciudadano
    if(uploadedFile){
      
      ciudadanoImagen.foto = "foto-ciudadano-" + id_ciudadano + ".jpg";
      ciudadanoImagen.detalle_motivo = "Carga de imagen del ciudadano";
      await this.ciudadanosService.update(+id_ciudadano,ciudadanoImagen,usuariox, "datos_personales");
    }
    

    return {
      message: 'Archivo subido con éxito',
      fileId: uploadedFile.id,
      link: uploadedFile.webViewLink,
    };
  }

  @Post()
  create(@Body() createCiudadanoDto: CreateCiudadanoDto) {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;
    
    createCiudadanoDto.fecha_alta = fecha_actual;  
    createCiudadanoDto.foto = "foto-ciudadano-0.jpg";
    
    return this.ciudadanosService.create(createCiudadanoDto, usuariox);
  }

  @Get('todos')
  findAll() {
    return this.ciudadanosService.findAll();
  }

  //BUSCAR CIUDADANO X DNI
  @Get('buscar-xdni')  
  async findCiudadanoXDni(
    @Query('dni', ParseIntPipe) dni: string, 
  ) {    
    
    return this.ciudadanosService.findXDni(+dni);
  }
  //FIN BUSCAR CIUDADANO X DNI...........................................

  //BUSCAR LISTA X DNI
  @Get('buscarlista-xdni')  
  async findListaXDni(
    @Query('dni', ParseIntPipe) dni: string, 
  ) {    
    
    return this.ciudadanosService.findListaXDni(+dni);
  }
  //FIN BUSCAR LISTA X DNI...........................................

  //BUSCAR LISTA X APELLIDO
  @Get('buscarlista-xapellido')  
  async findListaXApellido(
    @Query('apellido') apellido: string, 
  ) {    

    if ( apellido.length < 2 ) throw new NotFoundException('El apellido de busqueda debe tener mínimo (02) dos caracteres.');
          
    return this.ciudadanosService.findListaXApellido(apellido);
  }
  //FIN BUSCAR LISTA X APELLIDO...........................................

  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id_ciudadano: string) {
    return this.ciudadanosService.findOne(+id_ciudadano);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  //ESTABLECER ESTADO COMO VISITA
  @Put('establecer-visita')
  updateEstablecerComoVisita(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,
    @Body() dataDto: EstablecerVisitaDto
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;
    
    return this.ciudadanosService.establecerComoVisita(+id_ciudadano, dataDto, true, usuariox);
  }
  //FIN ESTABLECER ESTADO COMO VISITA.................................  

  //QUITAR ESTADO COMO VISITA
  @Put('quitar-visita')
  updateQuitarComoVisita(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string ,
    @Body() dataDto: EstablecerVisitaDto
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.ciudadanosService.establecerComoVisita(+id_ciudadano, dataDto, false, usuariox);
  }
  //FIN QUITAR ESTADO COMO VISITA.................................

  //ESTABLECER CON DISCAPACIDAD
  @Put('establecer-discapacidad')
  updateEstablecerConDiscapacidad(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,
    @Body() dataDto: EstablecerVisitaDto
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;
    
    return this.ciudadanosService.establecerConDiscapacidad(+id_ciudadano, dataDto, true, usuariox);
  }
  //FIN ESTABLECER CON DISCAPACIDAD.................................  

  //QUITAR DISCAPACIDAD
  @Put('quitar-discapacidad')
  updateQuitarDiscapacidad(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string ,
    @Body() dataDto: EstablecerVisitaDto
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.ciudadanosService.establecerConDiscapacidad(+id_ciudadano, dataDto, false, usuariox);
  }
  //FIN QUITAR DISCAPACIDAD...........................................

  //MODIFICAR DATOS PERSONALES
  @Put('update-datos-personales')
  updateDatosPersonales(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string ,
    @Body() dataDto: UpdateDatosPersonalesCiudadanoDto
  ) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    //datos_personales: para que solo se modifiquen los datos_personales e identificar
    //quq se guarde en tabla bitacora_ciudadano
    return this.ciudadanosService.update(+id_ciudadano, dataDto, usuariox, "datos_personales");
  }
  //FIN MODIFICAR DATOS PERSONALES...........................................

  //MODIFICAR DOMICILIO
  @Put('update-domicilio')
  updateDomicilio(
    @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string ,
    @Body() dataDto: UpdateDomicilioCiudadanoDto
  ) {
  
    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;
  
    //domicilio: para que solo se modifiquen los datos de domicilio e identificar
    //que se guarde en tabla domicilios_ciudadano
    return this.ciudadanosService.update(+id_ciudadano, dataDto, usuariox, "domicilio");
  }
  //FIN MODIFICAR DOMICILIO...........................................

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCiudadanoDto: UpdateCiudadanoDto) {

    let usuariox: Usuario= new Usuario;
    usuariox.id_usuario = 2;
    usuariox.organismo_id = 1;

    return this.ciudadanosService.update(+id, updateCiudadanoDto, usuariox, "todo");
  }

  @Delete('delete-imagen')
  async deleteImagenes(
     @Query('id_ciudadano', ParseIntPipe) id_ciudadano: string,
  ) {
    
    let fileName = "foto-ciudadano-" + id_ciudadano + ".jpg";

    let eliminadoFile: boolean = await this.driveImagenesService.deleteAllFilesByName(fileName, "ciudadano");
    if(!eliminadoFile) throw new NotFoundException("La imagen no se elimino correctamente");
    
    return {
      message: 'Imagen eliminada correctamente',
      eliminado: true,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ciudadanosService.remove(+id);
  }
}
