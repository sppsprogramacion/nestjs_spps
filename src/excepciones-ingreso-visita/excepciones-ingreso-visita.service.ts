import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExcepcionIngresoVisita } from './entities/excepciones-ingreso-visita.entity';
import { CreateExcepcionIngresoVisitaDto } from './dto/create-excepciones-ingreso-visita.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AnularExepcionDto } from './dto/anular-exepcion-visita.dto';
import { CumplimentarExepcionDto } from './dto/cumplimentar-exepcion-visita.dto';


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
        },
        order:{
          id_excepcion_ingreso_visita: "DESC"
        }
      }
    );   
        
    return excepciones;
  
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR  XCIUDADANO Y FECHA ACTUAL
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
  //FIN BUSCAR  XCIUDADANO Y FECHA ACTUAL..................................................................

  //BUSCAR  XCIUDADANO
    async findXFechaExcepcion(fecha_excepcionx: string, usuario: Usuario) {    
      
      const f_excepcion: any = new Date(fecha_excepcionx).toISOString().split('T')[0];
      const registros = await this.excepcionIngresoVisitaRepository.find(
        {        
          where: {
            fecha_excepcion: f_excepcion,
            anulado: false,
            organismo_id: usuario.organismo_id
          },
        }
      );   
          
      return registros;    
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
        throw new NotFoundException("No se puede anular. La excepcion ya se encontraba anulada.");

      //controlar si la fecha_exceocion es menor a la fecha actual. No se pueden anular excepcion anterior a la fecha actual
      if(fecha_actual > dataExcepcion.fecha_excepcion) throw new ConflictException("No se puede anular excepciones con fecha de excepción anterior a la fecha actual.")
        

      //actualiza la prohibicion en anulado
      dataExcepcion.anulado = true;
      dataExcepcion.detalle_excepcion = "ANULADO: - Fecha: " + fecha_actual 
          + " - Detalle: " + dataDto.detalle_cambio
          + " - Usuario: " + usuario.apellido + " " + usuario.nombre
          + " // " + dataExcepcion.detalle_excepcion;
      
      const respuesta = await this.excepcionIngresoVisitaRepository.update(id, dataExcepcion);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN ANULAR EXCEPCION

  //CUMPLIMENTAR EXCEPCION
  async cumplimentarExcepcion(id: number, dataDto: CumplimentarExepcionDto, usuario: Usuario) {
    
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    
    try{
      //buscar eexcepcion antes de modificar los datos 
      let dataExcepcion = await this.findOne(id);

      //verificar si el organismo de la prohibicion corresponde al organismo del usuario
      if(dataExcepcion.organismo_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar esta excepcion. No coincide el organismo al que pertece el usuario con el organismo que creo esta excepcion.");
    
      //verificar si la excepcion esta anulada, solo se anulan excepciones no anuladas
      if(dataExcepcion.anulado) 
        throw new NotFoundException("No se puede cumplimentar. La excepcion ya se encontraba anulada.");

      //verificar si la excepcion esta anulada, solo se anulan excepciones no anuladas
      if(dataExcepcion.cumplimentado) 
        throw new NotFoundException("No se puede cumplimentar. La excepcion ya se encontraba cumplimentada.");

      //controlar si la fecha actual < fecha_excepcion. No se pueden cumplimentar cuando la fecha actual es anterior a la fecha_excepcion
      if(fecha_actual < dataExcepcion.fecha_excepcion) throw new ConflictException("No se puede cumplimentar excepciones con fecha de excepción posterior a la fecha actual.")
        

      //actualiza la prohibicion en anulado
      dataExcepcion.cumplimentado = true;
      dataExcepcion.detalle_excepcion = "CUMPLIMENTADO: Fecha: " + fecha_actual 
          + " - Detalle: " + dataDto.detalle_cambio
          + " - Usuario: " + usuario.apellido + " " + usuario.nombre
          + " // " + dataExcepcion.detalle_excepcion;
      
      const respuesta = await this.excepcionIngresoVisitaRepository.update(id, dataExcepcion);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN CUMPLIMENTAR EXCEPCION
  
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
