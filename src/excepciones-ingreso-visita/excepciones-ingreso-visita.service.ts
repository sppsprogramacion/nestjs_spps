import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { ExcepcionIngresoVisita } from './entities/excepciones-ingreso-visita.entity';
import { CreateExcepcionIngresoVisitaDto } from './dto/create-excepciones-ingreso-visita.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { AnularExepcionDto } from './dto/anular-exepcion-visita.dto';
import { CumplimentarExepcionDto } from './dto/cumplimentar-exepcion-visita.dto';
import { InternosService } from 'src/internos/internos.service';


@Injectable()
export class ExcepcionesIngresoVisitaService {

  constructor(
    @InjectRepository(ExcepcionIngresoVisita)
    private readonly excepcionIngresoVisitaRepository: Repository<ExcepcionIngresoVisita>,

    private readonly internoService: InternosService,

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
    
    //verificar la unidad del interno coincide con la unidad del usuario
    let dataInterno = await this.internoService.findOne(dataDto.interno_id);
    if(!dataInterno) throw new NotFoundException("El interno seleccionado no se encuentra registrado.");
    if(dataInterno.organismo_id != usuario.organismo_id) throw new ConflictException("No es posible realizar cambios en internos alojados en otros organismos o unidades.");


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

  //BUSCAR  XFECHA EXCEPCION
    async findXFechaExcepcion(fecha_inicio: string, fecha_fin: string, usuario: Usuario) {    
      
      const f_inicio: any = new Date(fecha_inicio).toISOString().split('T')[0];
      const f_fin: any = new Date(fecha_fin).toISOString().split('T')[0];
      const registros = await this.excepcionIngresoVisitaRepository.find(
        {        
          where: {
            fecha_excepcion: Between(f_inicio, f_fin),
            anulado: false,
            organismo_id: usuario.organismo_id
          },
        }
      );   
          
      return registros;    
  }
  //FIN BUSCAR  XFECHA EXCEPCION..................................................................

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
      //buscar excepcion antes de modificar los datos 
      let dataExcepcion = await this.findOne(id);

      //verificar si el organismo de la prohibicion corresponde al organismo del usuario
      if(dataExcepcion.organismo_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar esta excepcion. No coincide el organismo al que pertece el usuario con el organismo que creo esta excepcion.");
    
      //verificar si la excepcion esta anulada, solo se anulan excepciones no anuladas
      if(dataExcepcion.anulado) 
        throw new NotFoundException("No se puede anular. La excepcion ya se encontraba anulada.");
      
      //verificar si la excepcion esta cumplimentada, solo se anulan excepciones no anuladas
      if(dataExcepcion.cumplimentado) 
        throw new NotFoundException("No se puede anular. La excepcion ya se encontraba cumplimentada.");

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
        throw new NotFoundException("No se puede aplicar el control. La excepcion ya se encontraba anulada.");

      //verificar si la excepcion esta controlada, solo se controlan excepciones no controladas
      if(dataExcepcion.controlado) 
        throw new NotFoundException("No se puede aplicar el control. La excepcion ya se encontraba controlada.");

      //controlar si la fecha actual < fecha_excepcion. No se pueden controlar cuando la fecha actual es anterior a la fecha_excepcion
      if(fecha_actual < dataExcepcion.fecha_excepcion) throw new ConflictException("No se puede cumplimentar excepciones con fecha de excepción posterior a la fecha actual.")
        

      //actualiza la prohibicion en anulado
      dataExcepcion.cumplimentado = dataDto.cumplimentado;
      dataExcepcion.controlado = true;
      let controlCumplimentado = "";
      if(dataExcepcion.cumplimentado){
        controlCumplimentado= "CUMPLIMENTADO"
      }
      else{
        controlCumplimentado= "NO CUMPLIMENTADO"
      }

      dataExcepcion.detalle_excepcion = controlCumplimentado + ": Fecha: " + fecha_actual 
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
  //FIN MANEJO DE ERRORES..............................................
}
