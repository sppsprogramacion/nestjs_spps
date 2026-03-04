import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { DriveImagenesService } from './drive-imagenes.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth, GetUser } from 'src/auth/decorators';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { isNotEmpty } from 'class-validator';

@Controller('drive-imagenes')
export class DriveImagenesController {
  constructor(private readonly driveImagenesService: DriveImagenesService) {}


  // @Post('upload-img-ciudadano')
  // @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  // async uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new BadRequestException('No se recibió ningún archivo');
  //   }
    
  //   const uploadedFile = await this.driveImagenesService.uploadFile(file, "ciudadano");
  //   return {
  //     message: 'Archivo subido con éxito',
  //     fileId: uploadedFile.id,
  //     link: uploadedFile.webViewLink,
  //   };
  // }

  // @Post('upload-img-interno')
  // @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  // async uploadFileInterno(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new BadRequestException('No se recibió ningún archivo');
  //   }

  //   const uploadedFile = await this.driveImagenesService.uploadFile(file, "interno");
  //   return {
  //     message: 'Archivo subido con éxito',
  //     fileId: uploadedFile.id,
  //     link: uploadedFile.webViewLink,
  //   };
  // }

  //BUSCAR IMAGEN DE CIUDADANO
  @Get('buscar-img-ciudadano')
  async getFileCiudadano(@Query('nameImagen') fileName: string) {
    if (!fileName) {
      throw new BadRequestException('Debe proporcionar un nombre de archi');
    }

    //const file = await this.driveImagenesService.getFileByName(fileName, "ciudadano");
    // return {
    //   fileId: file.id,
    //   name: file.name,
    //   viewLink: file.webViewLink, // 📄 Link para ver el archivo
    //   downloadLink: file.webContentLink, // ⬇️ Link para descargar
    // };

    const url = await this.driveImagenesService.getFileByName(fileName, "ciudadano");
    return { downloadUrl: url };
  }
  //FIN BUSCAR IMAGEN DE CIUDADANO......................................

  @Post('upload-img-defecto')
  @Auth()
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser("usuario") user: Usuario, //decorador  personalizado obtiene Usuario de la ruta donde esta autenticado
    @Query('tipo_perfil') tipo_perfil: string,
  ) {

    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    if(!isNotEmpty(tipo_perfil)){
      throw new NotFoundException("Debe ingresar un valor valido <<CIU, FF, FPD o FPI>>.");
    }

    if(tipo_perfil!= "CIU" && tipo_perfil != "FF" && tipo_perfil != "FPD" && tipo_perfil != "FPI"){
      throw new NotFoundException("El valor enviado debe ser valido <<CIU, FF,FPD o FPI>>.");
    }
        
    let foto_nombre ="";
    let carpeta ="";
    //Controlar si tiene o no imagen cargada
    if(tipo_perfil == "CIU"){
      foto_nombre = "foto-ciudadano-0.jpg";
      carpeta = "ciudadano";
    }
    else{
      foto_nombre = "foto-interno-"+ tipo_perfil +"-0.jpg";
      carpeta = "interno";
    }

    let existeFile: boolean = await this.driveImagenesService.existeFileByName(foto_nombre, carpeta);
    if(existeFile) throw new NotFoundException("En "+ carpeta +" ya se tiene una imagen cargada para este tipo: " + tipo_perfil);
    
    //guardar imagen
    const uploadedFile = await this.driveImagenesService.uploadFileDefecto(file, carpeta, foto_nombre);
    
    return {
      message: 'Archivo subido con éxito',
      fileId: uploadedFile.id,
      link: uploadedFile.webViewLink,
    };
  } 
}
