import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { google } from 'googleapis';
import * as fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class DriveImagenesService {
  
  private driveClient;

  //nombres de carpetas en google drive
  private ciudadanoFolderId: string = "1TrULzVJGIf0LVo4k1__lourNol-ch6FO";
  private internoFolderId: string = "1-MX0q6H8OlFTaSdE2obkCpcsIwIk89Zb";


  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'src/config/google-service-account.json', // Ruta del JSON
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    this.driveClient = google.drive({ version: 'v3', auth });
  }

  //SUBIR IMAGEN
  async uploadFile(file: Express.Multer.File, carpeta: string, id: number) {

    if (!file) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    //establecer carpeta de google drive
    let folderId: string;
    let nombreImagen: string;

    if(carpeta == "ciudadano"){      
      folderId= this.ciudadanoFolderId;
      nombreImagen = "foto-ciudadano-" + id + ".jpg";
    }
    if(carpeta == "interno"){      
      folderId= this.internoFolderId;
      nombreImagen = "foto-interno-" + id + ".jpg";
    }

    // Convertir buffer a Stream
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null); // Indica el final del stream

    const fileMetadata = {
      //name: file.originalname,
      name: nombreImagen,
      parents: [folderId], // Reemplaza con el ID de tu carpeta en Google Drive
    };

    const media = {
      mimeType: file.mimetype,
      body: bufferStream, // ⚠️ Ahora sí es un Stream
    };

    //guardar el archivo
    const response = await this.driveClient.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    // ✅ Hacer público el archivo después de subirlo
    await this.makeFilePublic(response.data.id);

    return response.data;
  }

  //BUSCAR IMAGEN EN CARPETA - carpeta puede ser de ciudadano o interno
  async getFileByName(fileName: string, carpeta: string) {

    let folderId: string;

    if(carpeta == "ciudadano"){
      
      folderId= this.ciudadanoFolderId;
    }

    if(carpeta == "interno"){
      
      folderId= this.internoFolderId;
    }

    const response = await this.driveClient.files.list({
      q: `name='${fileName}' and '${folderId}' in parents`, // 🔍 Buscar archivo por nombre
      fields: 'files(id, name, webViewLink, webContentLink)',
    });
  
    if (response.data.files.length === 0) {
      throw new NotFoundException('Archivo no encontrado');
    }

    const fileId = response.data.files[0].id;
    //return `https://drive.google.com/uc?id=${fileId}&export=download`;
    
    return response.data.files[0]; // 📂 Devuelve el primer archivo encontrado
  }
  //fin BUSCAR IMAGEN.....................

  //HACER PUBLICO UN ARCHIVO
  // 📌 Método para hacer público un archivo específico en Google Drive
  async makeFilePublic(fileId: string) {
    const permission = {
      type: 'anyone', // Cualquiera con el enlace puede verlo
      role: 'reader', // Solo lectura
    };

    await this.driveClient.permissions.create({
      fileId: fileId,
      requestBody: permission,
    });
  }
  
}
