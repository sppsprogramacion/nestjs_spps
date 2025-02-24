import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, NotFoundException, Put, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { InternosService } from './internos.service';
import { CreateInternoDto } from './dto/create-interno.dto';
import { UpdateInternoDto } from './dto/update-interno.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';

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
  create(@Body() createDto: CreateInternoDto) {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    createDto.fecha_carga = fecha_actual;  
    createDto.foto = "foto-" + createDto.prontuario.toString();
    
    let id_usuario = 2;
    let id_organismo = 1;
    return this.internosService.create(createDto,id_usuario,id_organismo);
  }

  @Get('todos')
  findAll() {
    return this.internosService.findAll();
  }

  //BUSCAR X PRONTUARIO
  @Get('buscar-xprontuario')  
  async findInternoXProntuario(
    @Query('prontuario', ParseIntPipe) prontuario: string, 
  ) {    
    
    return this.internosService.findXProntuario(+prontuario);
  }
  //FIN BUSCAR CIUDADANO X DNI...........................................

  //BUSCAR X CODIGO
  @Get('buscar-xcodigo')  
  async findInternoXCodigo(
    @Query('codigo') codigo: string, 
  ) {    
    
    return this.internosService.findXCodigo(codigo);
  }
  //FIN BUSCAR CIUDADANO X DNI...........................................


  //BUSCAR LISTA X PRONTUARIO
  @Get('buscarlista-xprontuario')  
  async findListaXDni(
    @Query('prontuario', ParseIntPipe) prontuario: string, 
  ) {    
    
    return this.internosService.findListaXProntuario(+prontuario);
  }
  //FIN BUSCAR LISTA X PRONTUARIO...........................................
  
  //BUSCAR LISTA X APELLIDO
  @Get('buscarlista-xapellido')  
  async findListaXApellido(
    @Query('apellido') apellido: string, 
  ) {    
    
    let id_organismo = 1;
    return this.internosService.findListaXApellido(apellido,id_organismo);
  }
  //FIN BUSCAR LISTA X APELLIDO...........................................

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.internosService.findOne(+id);
  }

  //PARA RUTA NO DEFINIDA
  @Get('*')
  rutasNoDefinidas() {
    throw new NotFoundException('No se encontró la ruta especificada. Verifique si la ruta es correcta');
  }
  //FIN PARA RUTA NO DEFINIDA...........

  @Put(':codigo')
  update(@Param('codigo') codigo: string, @Body() UpdateInternoDto: UpdateInternoDto) {
    return this.internosService.updateXCodigo(codigo, UpdateInternoDto);
  }

}
