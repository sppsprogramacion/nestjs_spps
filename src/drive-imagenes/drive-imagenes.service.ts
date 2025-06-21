import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { google } from 'googleapis';
import { Readable } from 'stream';
import { OAuth2Client, JWT } from 'google-auth-library';

@Injectable()
export class DriveImagenesService {
  
  private driveClient;

  //nombres de carpetas en google drive
  private ciudadanoFolderId: string = "1TrULzVJGIf0LVo4k1__lourNol-ch6FO";
  private internoFolderId: string = "1-MX0q6H8OlFTaSdE2obkCpcsIwIk89Zb";


  // constructor() {
    
  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: 'src/config/google-service-account.json', // Ruta del JSON
  //     scopes: ['https://www.googleapis.com/auth/drive.file'],
  //   });

  //   this.driveClient = google.drive({ version: 'v3', auth });
  // }

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'src/config/google-service-account.json',
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });
  
    // Este bloque es asíncrono, no puedes usar await en el constructor directamente.
    auth.getClient().then(authClient => {
      this.driveClient = google.drive({
        version: 'v3',
        auth: authClient as OAuth2Client | JWT,
      });
    }).catch(error => {
      console.error('Error al inicializar Google Drive:', error);
    });
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
    let imagenDefecto: string;

    if(carpeta == "ciudadano"){
      
      folderId= this.ciudadanoFolderId;
      imagenDefecto = "foto-ciudadano-0.jpg";
    }

    if(carpeta == "interno"){
      
      folderId= this.internoFolderId;
      imagenDefecto = "foto-interno-0.jpg";
    }

    //buscar foto
    const response = await this.driveClient.files.list({
      q: `name='${fileName}' and '${folderId}' in parents`, // 🔍 Buscar archivo por nombre
      fields: 'files(id, name, webViewLink, webContentLink)',
    });
  
    //cuando no encuentra la imagen devuelve la imagen por defecto
    if (response.data.files.length === 0) {
      //busca imagen por defecto
      const response2 = await this.driveClient.files.list({
        q: `name='${imagenDefecto}' and '${folderId}' in parents`, // 🔍 Buscar archivo por nombre
        fields: 'files(id, name, webViewLink, webContentLink)',
      });
      //cuando no encuentra la imagen personalizada o por defecto devuelve null
      if (response2.data.files.length === 0) {
        return null;
      }
      
      //devuelve imagen por defecto en caso de fallar antes
      return response2.data.files[0]; // 📂 Devuelve el primer archivo encontrado
    }    

    const fileId = response.data.files[0].id;
    //return `https://drive.google.com/uc?id=${fileId}&export=download`;
    
    //devuelve la primer imagen buscada
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
