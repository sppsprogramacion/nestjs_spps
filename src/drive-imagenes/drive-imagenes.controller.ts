import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { DriveImagenesService } from './drive-imagenes.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('drive-imagenes')
export class DriveImagenesController {
  constructor(private readonly driveImagenesService: DriveImagenesService) {}


  @Post('upload-ciudadano')
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar archivos
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { message: 'No se recibió ningún archivo' };
    }

    const uploadedFile = await this.driveImagenesService.uploadFile(file);
    return {
      message: 'Archivo subido con éxito',
      fileId: uploadedFile.id,
      link: uploadedFile.webViewLink,
    };
  }

  @Get('file-ciudadano')
  async getFile(@Query('nameImagen') fileName: string) {
    if (!fileName) {
      return { message: 'Debe proporcionar un nombre de archivo' };
    }

    const file = await this.driveImagenesService.getFileByName(fileName);
    return {
      fileId: file.id,
      name: file.name,
      viewLink: file.webViewLink, // 📄 Link para ver el archivo
      downloadLink: file.webContentLink, // ⬇️ Link para descargar
    };
  }
}
