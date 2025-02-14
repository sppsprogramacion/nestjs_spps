import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, NotFoundException, BadRequestException } from '@nestjs/common';
import { DriveImagenesService } from './drive-imagenes.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('drive-imagenes')
export class DriveImagenesController {
  constructor(private readonly driveImagenesService: DriveImagenesService) {}


  @Post('upload-img-ciudadano')
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    const uploadedFile = await this.driveImagenesService.uploadFile(file, "ciudadano");
    return {
      message: 'Archivo subido con éxito',
      fileId: uploadedFile.id,
      link: uploadedFile.webViewLink,
    };
  }

  @Post('upload-img-interno')
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  async uploadFileInterno(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    const uploadedFile = await this.driveImagenesService.uploadFile(file, "interno");
    return {
      message: 'Archivo subido con éxito',
      fileId: uploadedFile.id,
      link: uploadedFile.webViewLink,
    };
  }

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

  //BUSCAR IMAGEN DE INTERNO
  @Get('buscar-img-interno')
  async getFileInterno(@Query('nameImagen') fileName: string) {
    if (!fileName) {
      throw new BadRequestException('Debe proporcionar un nombre de archi');
    }

    // const file = await this.driveImagenesService.getFileByName(fileName, "interno");
    // return {
    //   fileId: file.id,
    //   name: file.name,
    //   viewLink: file.webViewLink, // 📄 Link para ver el archivo
    //   downloadLink: file.webContentLink, // ⬇️ Link para descargar
    // };

    const url = await this.driveImagenesService.getFileByName(fileName, "ciudadano");
    return { downloadUrl: url };

  }
  //FIN BUSCAR IMAGEN DE INTERNO......................................
}
