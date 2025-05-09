import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExcepcionIngresoVisita } from './entities/excepciones-ingreso-visita.entity';
import { CreateExcepcionIngresoVisitaDto } from './dto/create-excepciones-ingreso-visita.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AnularExepcionDto } from './dto/anular-exepcion-visita.dto';


@Injectable()
export class ExcepcionesIngresoVisitaService {

  constructor(
    @InjectRepository(ExcepcionIngresoVisita)
    private readonly excepcionIngresoVisitaRepository: Repository<ExcepcionIngresoVisita>

  ){}

  //NUEVA EXCEPCION
  async create(dataDto: CreateExcepcionIngresoVisitaDto, usuario: Usuario): Promise<ExcepcionIngresoVisita> {
      
    let fecha_actual: any = new Date().toISOString().split('T')[0];

    //controlar si la fecha_excepcion es menor a la fecha actual. No se puede ingresar fecha_excepcion menor a la fecha actual
    if(dataDto.fecha_excepcion < fecha_actual) throw new ConflictException("La fecha de excepción no puede ser anterior a la fecha actual.")
        
    //cargar datos por defecto
    dataDto.fecha_carga = fecha_actual;
    dataDto.usuario_carga_id = usuario.id_usuario;
    dataDto.organismo_id = usuario.organismo_id;
    
    try {
      
      const nuevo = await this.excepcionIngresoVisitaRepository.create(dataDto);
      let respuesta = await this.excepcionIngresoVisitaRepository.save(nuevo);
      
      return respuesta;
    }catch (error) {
      
      this.handleDBErrors(error);  
    }     
  }
  //FIN NUEVA EXCEPCION........................................................

  //BUSCAR  XCIUDADANO
  async findXCiudano(id_ciudanox: number) { 
    const excepciones = await this.excepcionIngresoVisitaRepository.find(
      {        
        where: {
          ciudadano_id: id_ciudanox,
          anulado: false
        },
        order:{
          id_excepcion_ingreso_visita: "DESC"
        }
      }
    );   
        
    return excepciones;
  
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR  XCIUDADANO
  async findXCiudanoFechaActual(id_ciudanox: number, usuario: Usuario) { 
    let fecha_actual: any = new Date().toISOString().split('T')[0];

    const excepciones = await this.excepcionIngresoVisitaRepository.find(
      {        
        where: {
          ciudadano_id: id_ciudanox,
          organismo_id: usuario.organismo_id,
          anulado: false,
          fecha_excepcion: fecha_actual
        },
        order:{
          id_excepcion_ingreso_visita: "DESC"
        }
      }
    );   
        
    return excepciones;
  
  }
  //FIN BUSCAR  XCIUDADANO..................................................................


  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.excepcionIngresoVisitaRepository.findOneBy({id_excepcion_ingreso_visita: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //ANULAR EXCEPCION
  async anularExcepcion(id: number, dataDto: AnularExepcionDto, usuario: Usuario) {
    
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    
    try{
      //buscar eexcepcion antes de modificar los datos 
      let dataExcepcion = await this.findOne(id);

      //verificar si el organismo de la prohibicion corresponde al organismo del usuario
      if(dataExcepcion.organismo_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar esta excepcion. No coincide el organismo al que pertece el usuario con el organismo que creo esta excepcion.");
    
      //verificar si la excepcion esta anulada, solo se anulan excepciones no anuladas
      if(dataExcepcion.anulado) 
        throw new NotFoundException("No se puede anular. La prohibicion ya se encontraba anulada.");

      //controlar si la fecha_exceocion es menor a la fecha actual. No se pueden anular excepcion anterior a la fecha actual
      if(dataExcepcion.fecha_excepcion < fecha_actual) throw new ConflictException("No se puede anular excepciones con fecha de excepción anterior a la fecha actual.")
        

      //actualiza la prohibicion en anulado
      dataExcepcion.anulado = true;
      // let fecha_excepcion: any = dataExcepcion.fecha_excepcion.toISOString().split('T')[0];
      // console.log("fecha exepcion: ", fecha_excepcion);
      // dataExcepcion.fecha_excepcion = fecha_excepcion;
      dataExcepcion.detalle_anulado = dataDto.detalle_anulado;
      dataExcepcion.usuario_anula = usuario.apellido + " " + usuario.nombre;
      
      const respuesta = await this.excepcionIngresoVisitaRepository.update(id, dataExcepcion);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN ANULAR EXCEPCION
  
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
