import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTrasladosInternoDto } from './dto/create-traslados-interno.dto';
import { UpdateTrasladosInternoDto } from './dto/update-traslados-interno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TrasladoInterno } from './entities/traslados-interno.entity';
import { Not, Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { IngresosInternoService } from 'src/ingresos-interno/ingresos-interno.service';
import { UpdateProcesarTrasladoDto } from './dto/update-procesar-traslado.dto';

@Injectable()
export class TrasladosInternoService {
  constructor(
    @InjectRepository(TrasladoInterno)
    private readonly trasladoInternoRepository: Repository<TrasladoInterno>,
    @Inject(forwardRef(() => IngresosInternoService))
    private readonly ingresoInternoService: IngresosInternoService
  ){}
  
  //NUEVO
  async create(data: CreateTrasladosInternoDto, usuario: Usuario): Promise<TrasladoInterno> {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 

    data.fecha_carga = fecha_actual;  
    data.hora_carga = hora_actual;
    data.estado_traslado = "Pendiente";
    data.organismo_origen_id = usuario.organismo_id;
    data.usuario_id = usuario.id_usuario;    
    
    //controlar ingreso del nterno
    const ingresoInterno = await this.ingresoInternoService.findOne(data.ingreso_interno_id); 
    if (!ingresoInterno) throw new NotFoundException("El ingreso del interno no existe.");
    if (ingresoInterno.eliminado) throw new NotFoundException("El ingreso del interno no es válido o no existe.");
    if (ingresoInterno.esta_liberado) throw new NotFoundException("El interno se encuentra liberado en este ingreso.");

    if(ingresoInterno.organismo_alojamiento_id != usuario.organismo_id) 
      throw new NotFoundException("El interno no se encuentra alojado en la unidad del usuario");

    //controlar que la unidad de destino no sea la misma que la uniad de alojamiento actual del interno
    if(data.organismo_destino_id == ingresoInterno.organismo_alojamiento_id) 
      throw new NotFoundException("El organismo destino no puede ser el organismo de alojamiento actual del interno");

    //buscar y verificar si hay traslados vigentes para este ingreso_interno
    const trasladosVigentes = await this.trasladoInternoRepository.find(
      {        
        where: {
          ingreso_interno_id: data.ingreso_interno_id,
          estado_traslado: "Pendiente"
        }
      }
    );

    if(trasladosVigentes.length > 0) 
      throw new NotFoundException("El interno tiene un traslado Pendiente actualmente.");

    //guardar traslado
    try {
      
      const nuevo = await this.trasladoInternoRepository.create(data);
      return await this.trasladoInternoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }
  //FIN NUEVO..................................................................

  async findAll() {
    return await this.trasladoInternoRepository.find(
      {
          order:{
              id_traslado_interno: "ASC"
          }
      }
    );
  }

  //BUSCAR  X INGRESO
  async findXIngreso(id_ingreso_x: number) { 
    const traslados = await this.trasladoInternoRepository.find(
      {        
        where: [
          {
            ingreso_interno_id: id_ingreso_x,
            estado_traslado: "Pendiente"
          },
          {
            ingreso_interno_id: id_ingreso_x,
            estado_traslado: "Aceptado"
          }
        ],
        order:{
          id_traslado_interno: "DESC"
        }
      }
    );   
        
    return traslados;    
  }
  //FIN BUSCAR  XINGRESO..................................................................
  
  //BUSCAR ULTIMO TRASLADO X INGRESO
  async findUltimoTraladoXIngreso(id_ingreso_x: number) {
  return await this.trasladoInternoRepository.findOne({
    where: [
      {
        ingreso_interno_id: id_ingreso_x,
        estado_traslado: "Pendiente",
      },
      {
        ingreso_interno_id: id_ingreso_x,
        estado_traslado: "Aceptado",
      }
    ],
    order: {
      id_traslado_interno: "DESC",
    },
  });
}
  //FIN BUSCAR ULTIMO TRASLADO X INGRESO

  //BUSCAR  XORGANISMO
  async findXMiOrganismo(id_organismox: number) {    
    
      const traslados = await this.trasladoInternoRepository.find(
        {        
          where: [
            { 
              organismo_origen_id: id_organismox,
              estado_traslado: Not("Anulado")
            },
            { 
              organismo_destino_id: id_organismox,
              estado_traslado: Not("Anulado")
            }
          ] ,     
          order:{
            id_traslado_interno: "DESC"
          }
        }
      );   
          
      return traslados;
  }
  //FIN BUSCAR  XORGANISMO.................................................................

  //BUSCAR  PENDIENTES XORGANISMO
  async findPendientesXOrganismo(id_organismox: number) {    
    
      const traslados = await this.trasladoInternoRepository.find(
        {        
          where: [
            { 
              organismo_origen_id: id_organismox,
              estado_traslado: "Pendiente"
            },
            { 
              organismo_destino_id: id_organismox,
              estado_traslado: "Pendiente"
            }
          ] ,     
          order:{
            id_traslado_interno: "DESC"
          }
        }
      );   
          
      return traslados;
  }
  //FIN BUSCAR PENDIENTES XORGANISMO.................................................................
  
  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.trasladoInternoRepository.findOneBy({id_traslado_interno: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................
  
  //ANULAR TRASLADO
    async anularTraslado(id: number, data: UpdateProcesarTrasladoDto, usuario: Usuario) {
      
    let dataTraslado: CreateTrasladosInternoDto = new CreateTrasladosInternoDto;

    try{
      
      //buscar traslado antes de modificar los datos 
      dataTraslado = await this.findOne(id);
      
      //verificar si el organismo creador del traslado corresponde al organismo del usuario
      if(dataTraslado.organismo_origen_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar este traslado. No coincide el organismo al que pertece el usuario con el organismo origen de este traslado.");
      
      //verificar si el traslado esta cumplimentado
      if(dataTraslado.estado_traslado != "Pendiente") 
        throw new NotFoundException("No se puede anular. Solo se pueden anular traslados Pendientes.");
     
      //actualiza la prohibicion para anular
      let fecha_actual: any = new Date().toISOString().split('T')[0];    
      let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS
      dataTraslado.estado_traslado = "Anulado";
      dataTraslado.obs_traslado = "ANULADO: " + data.obs_traslado + " - (Usuario: " + usuario. apellido + " " + usuario.nombre + " - " + fecha_actual + " " + hora_actual + ")"; 

      const respuesta = await this.trasladoInternoRepository.update(id, dataTraslado);
            
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN ANULAR TRASLADO.....................................................

  //CUMPLIMENTAR TRASLADO se acepta o rechaza el traslado (nuevo_estado_traslado = aceptar o rechazar)
    async cumplimentarTraslado(id: number, data: UpdateProcesarTrasladoDto, nuevo_estado_traslado: string, usuario: Usuario) {
      
    let dataTraslado: CreateTrasladosInternoDto = new CreateTrasladosInternoDto;
    
    try{
      //buscar traslado antes de modificar los datos 
      dataTraslado = await this.findOne(id);

      //verificar si el organismo destino del traslado corresponde al organismo del usuario
      if(dataTraslado.organismo_destino_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar este traslado. No coincide el organismo destino del traslado con el organismo del usuario que recibe.");
      
      //verificar si el traslado esta pendiente para poder aceptar o rechazar
      if(dataTraslado.estado_traslado != "Pendiente") 
        throw new NotFoundException("No se puede" + nuevo_estado_traslado + ". Solo se pueden " + nuevo_estado_traslado + " traslados Pendientes.");
     
      //actualiza datos del traslado
      let fecha_actual: any = new Date().toISOString().split('T')[0];    
      let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS
      
      if(nuevo_estado_traslado == "aceptar"){
        dataTraslado.estado_traslado = "Aceptado";
        dataTraslado.fecha_ingreso_destino = fecha_actual;
      }
      
      if(nuevo_estado_traslado == "rechazar")
        dataTraslado.estado_traslado = "Rechazado";
      
      dataTraslado.obs_traslado = dataTraslado.estado_traslado.toLocaleUpperCase() + ": " + data.obs_traslado + " - (Usuario: " + usuario. apellido + " " + usuario.nombre + " - " + fecha_actual + " " + hora_actual + ")"; 

      const respuesta = await this.trasladoInternoRepository.update(id, dataTraslado);
            
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN CUMPLIMENTAR TRASLADO...............................................................


  async update(id: number, data: UpdateTrasladosInternoDto, usuario: Usuario) {

    try{
      const respuesta = await this.trasladoInternoRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }
  
  async remove(id: number) {
    
    return 
  }
  
  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
  }
  //FIN MANEJO DE ERRORES........................................This action removes a #${id} trasladosInterno`;
  
}
