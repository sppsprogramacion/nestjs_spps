import { Injectable } from '@nestjs/common';

import { google } from 'googleapis';
import * as fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class DriveImagenesService {
  
  private driveClient;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'src/config/google-service-account.json', // Ruta del JSON
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    this.driveClient = google.drive({ version: 'v3', auth });
  }

  async uploadFile(file: Express.Multer.File) {

    if (!file) {
      throw new Error('No se recibió ningún archivo');
    }

    // Convertir buffer a Stream
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null); // Indica el final del stream

    const fileMetadata = {
      name: file.originalname,
      parents: ['1TrULzVJGIf0LVo4k1__lourNol-ch6FO'], // Reemplaza con el ID de tu carpeta en Google Drive
    };

    const media = {
      mimeType: file.mimetype,
      body: bufferStream, // ⚠️ Ahora sí es un Stream
    };

    const response = await this.driveClient.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id, webViewLink',
    });

    return response.data;
  }

  async getFileByName(fileName: string) {
    const response = await this.driveClient.files.list({
      q: `name='${fileName}'`, // 🔍 Buscar archivo por nombre
      fields: 'files(id, name, webViewLink, webContentLink)',
    });
  
    if (response.data.files.length === 0) {
      throw new Error('Archivo no encontrado');
    }
  
    return response.data.files[0]; // 📂 Devuelve el primer archivo encontrado
  }
  
}
