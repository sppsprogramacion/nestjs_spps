import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCiudadanoDto } from './dto/create-ciudadano.dto';
import { UpdateCiudadanoDto } from './dto/update-ciudadano.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ciudadano } from './entities/ciudadano.entity';
import { Like, Repository } from 'typeorm';
import { EstablecerVisitaDto } from './dto/establecer-visita.dto';
import { CreateNovedadesCiudadanoDto } from '../novedades-ciudadano/dto/create-novedades-ciudadano.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { NovedadesCiudadanoService } from 'src/novedades-ciudadano/novedades-ciudadano.service';
import { EstablecerDiscapacidadDto } from './dto/establecer-discapacidad.dto';

@Injectable()
export class CiudadanosService {

  constructor(
    @InjectRepository(Ciudadano)
    private readonly ciudadanoRepository: Repository<Ciudadano>,
    
    private readonly novedadesCiudadanoService: NovedadesCiudadanoService
  ){}
  
  async create(createCiudadanoDto: CreateCiudadanoDto, usuariox: Usuario) {
    createCiudadanoDto.usuario_id_alta = usuariox.id_usuario;
    createCiudadanoDto.organismo_alta_id = usuariox.organismo_id;

    try {

      const nuevo: Ciudadano = await this.ciudadanoRepository.create(createCiudadanoDto );

      return await this.ciudadanoRepository.save(nuevo);

    } catch (error) {      

      if(error.code=='ER_DUP_ENTRY'){
      
        let existe = await this.ciudadanoRepository.findOneBy({dni: createCiudadanoDto.dni});
        if(existe) throw new BadRequestException ("El dni ya existe.");
      }   

      throw new InternalServerErrorException('Error al crear el ciudadano: ' + error.message);
    }
  }

  async findAll() {
    return await this.ciudadanoRepository.find(
      {
        order:{
            apellido: "ASC"
        }
      }
    );
  }
  
  //BUSCAR LISTA POR DNI
  async findListaXDni(dnix: number) {

    return this.ciudadanoRepository
    .createQueryBuilder('ciudadano')
    .select(['ciudadano.id_ciudadano', 'ciudadano.apellido', 'ciudadano.nombre', 'ciudadano.dni']) // Campos específicos
    .leftJoinAndSelect('ciudadano.sexo', 'sexo') // Relación
    .where('ciudadano.dni = :dni', {dni: dnix})
    .orderBy('ciudadano.apellido', 'ASC')
    .getMany();

  }
  //FIN BUSCAR LISTA POR DNI....................................

  //BUSCAR LISTA POR APELLIDO
  async findListaXApellido(apellidox: string) {
    console.log("en apellido");
    
    return this.ciudadanoRepository
    .createQueryBuilder('ciudadano')
    .select(['ciudadano.id_ciudadano', 'ciudadano.apellido', 'ciudadano.nombre', 'ciudadano.dni']) // Campos específicos
    .leftJoinAndSelect('ciudadano.sexo', 'sexo') // Relación
    .where('ciudadano.apellido LIKE :apellido', {apellido: `%${apellidox}%`})
    .orderBy('ciudadano.apellido', 'ASC')
    .getMany();
  }
  //FIN BUSCAR LISTA POR APELLIDO....................................

  //BUSCAR  XDni
  async findXDni(dnix: number) {
    
    const respuesta = await this.ciudadanoRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XDni..................................................................


  async findOne(id: number) {
    const respuesta = await this.ciudadanoRepository.findOneBy({id_ciudadano: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.", "verificque el id del ciudadano");

    return respuesta;
  }

  async update(id: number, updateCiudadanoDto: UpdateCiudadanoDto, usuariox: Usuario) {
    try{
      const respuesta = await this.ciudadanoRepository.update(id, updateCiudadanoDto);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
    
  }

  //ESTABLECER CIUDADANO COMO VISITA Y LUEGO GUARDAR EN TABLA NOVEDADES
  //accion puede ser true o false
  async establecerComoVisita(id_ciudadanox: number, data: EstablecerVisitaDto, accion: boolean, usuariox: Usuario) {
    
    let dataCiudadano: CreateCiudadanoDto = new CreateCiudadanoDto;
    let novedad: string="";

    if(accion){
      novedad = "ESTABLECER ESTADO COMO VISITA";
      dataCiudadano.es_visita = accion;
    }

    if(!accion){
      novedad = "QUITAR ESTADO COMO VISITA";
      dataCiudadano.es_visita = accion;
    }
    
    try{
      const respuesta = await this.ciudadanoRepository.update(id_ciudadanox, dataCiudadano);
      if((await respuesta).affected == 1){
        //guardar novedad
        let fecha_actual: any = new Date().toISOString().split('T')[0];
        let dataNovedad: CreateNovedadesCiudadanoDto = new CreateNovedadesCiudadanoDto;
        
        dataNovedad.ciudadano_id = id_ciudadanox;        
        dataNovedad.novedad = novedad;
        dataNovedad.novedad_detalle = data.novedad_detalle;
        dataNovedad.organismo_id = usuariox.organismo_id;
        dataNovedad.usuario_id = usuariox.id_usuario;
        dataNovedad.fecha_novedad = fecha_actual;
                
        await this.novedadesCiudadanoService.create(dataNovedad);
      } 

      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN ESTABLECER CIUDADANO COMO VISITA Y LUEGO GUARDAR EN TABLA NOVEDADES

  //ESTABLECER CIUDADANO CON DISCAPACIDAD Y LUEGO GUARDAR EN TABLA NOVEDADES
  //accion puede ser true o false
  async establecerConDiscapacidad(id_ciudadanox: number, data: EstablecerDiscapacidadDto, accion: boolean, usuariox: Usuario) {
    
    let dataCiudadano: CreateCiudadanoDto = new CreateCiudadanoDto;
    let novedad: string="";

    if(accion){
      novedad = "ESTABLECER CON DISCAPACIDAD";
      dataCiudadano.tiene_discapacidad = accion;
    }

    if(!accion){
      novedad = "QUITAR DISCAPACIDAD";
      dataCiudadano.tiene_discapacidad = accion;
    }
    
    try{
      const respuesta = await this.ciudadanoRepository.update(id_ciudadanox, dataCiudadano);
      if((await respuesta).affected == 1){
        //guardar novedad
        let fecha_actual: any = new Date().toISOString().split('T')[0];
        let dataNovedad: CreateNovedadesCiudadanoDto = new CreateNovedadesCiudadanoDto;
        
        dataNovedad.ciudadano_id = id_ciudadanox;        
        dataNovedad.novedad = novedad;
        dataNovedad.novedad_detalle = data.novedad_detalle;
        dataNovedad.organismo_id = usuariox.organismo_id;
        dataNovedad.usuario_id = usuariox.id_usuario;
        dataNovedad.fecha_novedad = fecha_actual;
                
        await this.novedadesCiudadanoService.create(dataNovedad);
      } 

      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN ESTABLECER CIUDADANO COMO VISITA Y LUEGO GUARDAR EN TABLA NOVEDADES

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
