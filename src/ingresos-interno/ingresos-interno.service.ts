import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIngresosInternoDto } from './dto/create-ingresos-interno.dto';
import { UpdateIngresosInternoDto } from './dto/update-ingresos-interno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IngresoInterno } from './entities/ingresos-interno.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateIngresoOtraUnidadDto } from './dto/update-ingreso-otra-unidad.dto';
import { TrasladosInternoService } from 'src/traslados-interno/traslados-interno.service';

@Injectable()
export class IngresosInternoService {
  
  constructor(
    @InjectRepository(IngresoInterno)
    private readonly ingresossInternoRepository: Repository<IngresoInterno>,
    @Inject(forwardRef(() => TrasladosInternoService))
    private readonly trasladosInternoService: TrasladosInternoService
    //private readonly bitacoraProhibicionesVisitaService: BitacoraProhibicionesVisitaService
  ){}

  //NUEVO
  async create(data: CreateIngresosInternoDto, usuario: Usuario): Promise<IngresoInterno> {
    
    let fecha_actual: any = new Date().toISOString().split('T')[0];     
    
    //buscar ingreso antes de crear uno nuevo
    const ingresoVigente = await this.ingresossInternoRepository.findOne(
      {        
        where: {
          interno_id: data.interno_id,
          eliminado: false,
          esta_liberado: false
        }
      }
    ); 
    
    //verificar si hay un ingreso vigente para este interno
    if(ingresoVigente) 
      throw new NotFoundException("El interno tiene un ingreso vigente actualmente.");
    
        
    //cargar datos por defecto
    data.fecha_carga = fecha_actual;
    data.organismo_alojamiento_id = usuario.organismo_id;
    data.usuario_carga_id = usuario.id_usuario;
    data.organismo_carga_id = usuario.organismo_id;
    
    try {
      
      const nuevo = await this.ingresossInternoRepository.create(data);
      let respuesta = await this.ingresossInternoRepository.save(nuevo);
      
      return respuesta;
    }catch (error) {
      
      this.handleDBErrors(error);  
    }     
  }
  //FIN NUEVO....................................................

  //BUSCAR TODOS
  async findAll() {
    return await this.ingresossInternoRepository.find(
      {
          order:{
              id_ingreso_interno: "DESC"
          }
      }
    );
  }
  //FIN BUSCAR TODOS...........................................

  //BUSCAR  XINTERNO
  async findXInterno(id_internox: number) { 
      const ingreso = await this.ingresossInternoRepository.findOne(
        {        
          where: {
            interno_id: id_internox,
            eliminado: false,
            esta_liberado: false
          }
        }
      );   
          
      return ingreso;
    
  }
  //FIN BUSCAR  XINTERNO..................................................................

  //BUSCAR  XORGANISMO
  async findXOrganismo(id_organismox: number) {    
    
      const prohibiciiones = await this.ingresossInternoRepository.find(
        {        
          where: {
            organismo_alojamiento_id: id_organismox
          },
          order:{
            id_ingreso_interno: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
  }
  //FIN BUSCAR  XORGANISMO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.ingresossInternoRepository.findOneBy({id_ingreso_interno: id});
    if (!respuesta) throw new NotFoundException("El ingreso solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................
  
  //INGRESAR DESDE OTRA UNIDAD
  async updateIngresarDesdeOtraUnidad(id: number, data: UpdateIngresoOtraUnidadDto, usuario:Usuario) {
        
    try{
      //buscar ingreso antes de modificar
      let dataIngreso = await this.findOne(id);
      
      //verificar si el ingreso esta como liberado, solo se modifican ingresos vigentes
      if(dataIngreso.esta_liberado) 
        throw new NotFoundException("No se puede modificar los datos de ingreso. El interno esta liberado.");

      //verificar si el ingreso esta eliminado, solo se modifican ingresos vigentes
      if(dataIngreso.eliminado) 
        throw new NotFoundException("No se puede modificar un ingreso eliminado");

      //verificar si el organismo del ingreso corresponde al organismo del usuario
      if(dataIngreso.organismo_alojamiento_id != usuario.organismo_id) {     
        //buscar ultimo traslado del interno   
        let dataTraslado = await this.trasladosInternoService.findUltimoTraladoXIngreso(dataIngreso.id_ingreso_interno);
        
        if(!dataTraslado) 
          throw new NotFoundException("El interno no tiene un traslado efectuado.");

        //verificar si el organismo destino del traslado corresponde al organismo del usuario
        if(dataTraslado.organismo_destino_id != usuario.organismo_id) 
          throw new NotFoundException("El interno no tiene un traslado a esta unidad.");
        
        //verificar si el traslado esta pendiente para poder aceptar o rechazar
        if(dataTraslado.estado_traslado != "Aceptado") 
          throw new NotFoundException("El traslado debe ser aceptado para poder dar ingreso al interno.");
        
        data.organismo_procedencia_id = dataIngreso.organismo_alojamiento_id;
        data.organismo_alojamiento_id = usuario.organismo_id;

      }
    
      //actualiza los datos de ingreso
      const respuesta = await this.ingresossInternoRepository.update(id, data);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN INGRESAR DESDE OTRA UNIDAD..................................................

  async update(id: number, data: UpdateIngresosInternoDto, usuario:Usuario) {
        
    try{
      //buscar ingreso antes de modificar
      let dataIngreso = await this.findOne(id);
      
      //verificar si el organismo del ingreso corresponde al organismo del usuario
      if(dataIngreso.organismo_alojamiento_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar este registro. No coincide el organismo al que pertece el usuario con el organismo de alojamiento.");
              
      //verificar si el ingreso esta vigente, solo se modifican ingresos vigentes
      if(dataIngreso.esta_liberado) 
        throw new NotFoundException("No se puede modificar los datos de ingreso. El interno esta liberado.");

      //verificar si la prohibicion esta vigente, solo se modifican prohibiciones vigentes
      if(!dataIngreso.eliminado) 
        throw new NotFoundException("No se puede modificar un ingreso eliminado");
    
      //actualiza los datos de ingreso
      const respuesta = await this.ingresossInternoRepository.update(id, data);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
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
