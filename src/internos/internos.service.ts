import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateInternoDto } from './dto/create-interno.dto';
import { UpdateInternoDto } from './dto/update-interno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interno } from './entities/interno.entity';
import { Repository } from 'typeorm';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateInternoUnidadDto } from './dto/create-interno-unidad.dto';
import { plainToInstance } from 'class-transformer';
import { IngresoInterno } from 'src/ingresos-interno/entities/ingresos-interno.entity';

@Injectable()
export class InternosService {
  constructor(
    @InjectRepository(Interno)
    private readonly internoRepository: Repository<Interno>,

    @InjectRepository(IngresoInterno)
    private readonly ingresossInternoRepository: Repository<IngresoInterno>,
        
    private readonly driveImagenesService: DriveImagenesService,
  ){}
  
  async create(createDto: CreateInternoUnidadDto, usuariox: Usuario) {
    let num_tramite_nuevo:number = 0;
    // Convertir y excluir propiedades no deseadas
    // const createDto = plainToInstance(CreateInternoDto, createUnidadDto, {
    //   excludeExtraneousValues: true, // Solo incluye propiedades decoradas en CreateInternoDto
    // });

    // if(usuariox.organismo.es_alcaidia){
    //   createDto.prontuario == null;
    // }
    // else{
    //   createDto.num_oc == null;
    // }
    //obtener numero de interno
    const num_interno_max = await this.internoRepository.createQueryBuilder('internos')
    .select('COUNT(internos.codigo)','num_max')
    .where('internos.organismo_carga_id = :organismo_id', {organismo_id: usuariox.organismo_id})
    .getRawOne();
   
    if(!num_interno_max) {
      num_interno_max.num_max = 0;
    }      
    num_tramite_nuevo = parseInt(num_interno_max.num_max) + 1;

    //cargar datos por defecto
    createDto.codigo = usuariox.organismo_id + "-" + num_tramite_nuevo;
    createDto.organismo_id = usuariox.organismo_id;
    createDto.organismo_carga_id = usuariox.organismo_id;
    

    try {

      const nuevo: Interno = await this.internoRepository.create(createDto);

      return await this.internoRepository.save(nuevo);

    } catch (error) {      

      if(error.code=='ER_DUP_ENTRY'){
      
        let existe = await this.internoRepository.findOneBy({prontuario: createDto.prontuario});
        if(existe) throw new BadRequestException ("El prontuario ya existe.");
      }   

      throw new InternalServerErrorException('Error al crear el interno: ' + error.message);
    }
  }

  async findAll() {
    return await this.internoRepository.find(
      {
        order:{
            apellido: "ASC"
        }
      }
    );
  }
  
  //BUSCAR LISTA POR PRONTUARIO
  async findListaXProntuario(prontuariox: number) {

    return this.internoRepository
      .createQueryBuilder('interno')
      .select(['interno.id_interno', 'interno.apellido', 'interno.nombre', 'interno.prontuario']) // Campos específicos
      .leftJoinAndSelect('interno.sexo', 'sexo') // Relación
      .where('interno.prontuario = :prontuario', {prontuario: prontuariox})
      .orderBy('interno.apellido', 'ASC')
      .getMany();

  }
  //FIN BUSCAR LISTA POR PRONTUARIO....................................

  //BUSCAR LISTA POR APELLIDO
  async findListaXApellido(apellidox: string, id_organismox: number) {
    
    return this.internoRepository
      .createQueryBuilder('interno')
      .select(['interno.id_interno', 'interno.apellido', 'interno.nombre', 'interno.prontuario']) // Campos específicos
      .leftJoinAndSelect('interno.sexo', 'sexo') // Relación
      .leftJoin('interno.ingresos', 'ingresos')
      .where('interno.apellido LIKE :apellido', {apellido: `%${apellidox}%`})
      .andWhere('ingresos.organismo_alojamiento_id = :idOrg', {
        idOrg: id_organismox,
      })
      .andWhere('ingresos.esta_liberado = :liberado', { liberado: false })
      //.andWhere('interno.organismo_id = :id_organismo', {id_organismo: id_organismox})
      .orderBy('interno.apellido', 'ASC')
      .getMany();
  }
  //FIN BUSCAR LISTA POR APELLIDO....................................

  //BUSCAR LISTA POR APELLIDO
  async findListaXApellidoGeneral(apellidox: string) {
    
    return this.internoRepository
      .createQueryBuilder('interno')
      .select(['interno.id_interno', 'interno.apellido', 'interno.nombre', 'interno.prontuario']) // Campos específicos
      .leftJoinAndSelect('interno.sexo', 'sexo') // Relación
      .where('interno.apellido LIKE :apellido', {apellido: `%${apellidox}%`})
      .orderBy('interno.apellido', 'ASC')
      .getMany();
  }
  //FIN BUSCAR LISTA POR APELLIDO....................................



  //BUSCAR  XPRONTUARIO
  async findXProntuario(prontuariox: number) {
    
    const respuesta = await this.internoRepository.findOneBy({prontuario: prontuariox});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XPRONTUARIO..................................................................

  //BUSCAR  XCODIGO
  async findXCodigo(codigox: string) {
    
    const respuesta = await this.internoRepository.findOneBy({codigo: codigox});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XCODIGO..................................................................


  async findOne(id: number) {
    const respuesta = await this.internoRepository.findOneBy({id_interno: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.", "verificque el id del ciudadano");
    let imgUrl: string = "";
    let foto_nombre = respuesta.foto;

    //obtener url de la imagen en drive y agregado en la respuesta
    const file = await this.driveImagenesService.getFileByName(foto_nombre, "interno");
    
    imgUrl = await file.webContentLink;
    respuesta.foto = imgUrl;

    return respuesta;
  }

  async update(id_interno: number, updateDto: UpdateInternoDto, usuario:Usuario) {
   
    //buscar ingreso del interno antes de modificar
    //let dataIngreso = await this.findOne(id);
    const dataIngreso = await this.ingresossInternoRepository.findOne(
      {        
        where: {
          interno_id: id_interno,
          esta_liberado: false,
          eliminado: false
        }       
      }
    );   
    
    if (!dataIngreso) throw new NotFoundException("El interno no tiene un ingreso en el S.P.P.S.");
    
    //verificar si el organismo del ingreso corresponde al organismo del usuario
    if(dataIngreso.organismo_alojamiento_id != usuario.organismo_id) 
      throw new NotFoundException("No tiene acceso a modificar este interno. No coincide el organismo al que pertece el usuario con el organismo de alojamiento.");
    
    //verificar si el ingreso esta vigente, solo se modifican ingresos vigentes
    if(dataIngreso.esta_liberado) 
      throw new NotFoundException("No se puede modificar los datos. El interno esta liberado.");
   
    try{
      const respuesta = await this.internoRepository.update(id_interno, updateDto);
      if((await respuesta).affected == 0){
        await this.findOne(id_interno);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
    
  }

  async updateXCodigo(codigox: string, updateDto: UpdateInternoDto) {
    try{
      const respuesta = await this.internoRepository.update({codigo:codigox}, updateDto);
      if((await respuesta).affected == 0){
        await this.findXCodigo(codigox);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }       
  }

  remove(id: number) {
    return `This action removes a #${id} ciudadano`;
  }

  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
    }
    //FIN MANEJO DE ERRORES........................................
}
