import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProhibicionesAnticipadaDto } from './dto/create-prohibiciones-anticipada.dto';
import { UpdateProhibicionesAnticipadaDto } from './dto/update-prohibiciones-anticipada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProhibicionAnticipada } from './entities/prohibiciones-anticipada.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { CreateBitacoraProhibicionesAnticipadaDto } from 'src/bitacora-prohibiciones-anticipadas/dto/create-bitacora-prohibiciones-anticipada.dto';
import { BitacoraProhibicionesAnticipadasService } from 'src/bitacora-prohibiciones-anticipadas/bitacora-prohibiciones-anticipadas.service';
import { LevantarManualProhibicionAnticipadaDto } from './dto/levantar-manual-prohibicion-anticipada.dto';
import { LevantarAutomaticoProhibicionAnticipadaDto } from './dto/levantar-automatico-prohibicion-anticipada.dto';

@Injectable()
export class ProhibicionesAnticipadasService {
  constructor(
    @InjectRepository(ProhibicionAnticipada)
    private readonly prohibicionAnticipadaRepository: Repository<ProhibicionAnticipada>,
    private readonly bitacoraProhibicionesAnticipadasService: BitacoraProhibicionesAnticipadasService
  ){}


  //NUEVO
  async create(data: CreateProhibicionesAnticipadaDto, usuario: Usuario): Promise<ProhibicionAnticipada> {
    
    let fecha_actual: any = new Date().toISOString().split('T')[0];               
    
    //controlar si la fecha inicio es menor o igual a la fecha_fin
    if(data.fecha_inicio > data.fecha_fin) throw new ConflictException("La fecha_inicio no puede ser mayor que la fecha_fin.")
            

    //cargar datos por defecto
    data.fecha_prohibicion = fecha_actual;
    data.usuario_id = usuario.id_usuario;
    data.organismo_id = usuario.organismo_id;
    
    try {
      
      const nuevo = await this.prohibicionAnticipadaRepository.create(data);
      let respuesta = await this.prohibicionAnticipadaRepository.save(nuevo);
      
      return respuesta;
    }catch (error) {
      
      this.handleDBErrors(error);  
    }     
  }
  //FIN NUEVO....................................................
  
  //BUSCAR TODOS
  async findAll() {
    return await this.prohibicionAnticipadaRepository.find(
      {
          order:{
              id_prohibicion_anticipada: "DESC"
          }
      }
    );
  }
  //FIN BUSCAR TODOS...........................................

  
  //BUSCAR  XORGANISMO
  async findXOrganismo(id_organismox: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.prohibicionAnticipadaRepository.find(
        {        
          where: {
            organismo_id: id_organismox
          },
          order:{
            id_prohibicion_anticipada: "DESC"
          }
        }
      );   
          
      return prohibiciiones;      
  }
  //FIN BUSCAR  XORGANISMO..................................................................
  
  //BUSCAR LISTA POR APELLIDO
  async findListaXApellido(apellidox: string) {
        
    return this.prohibicionAnticipadaRepository
    .createQueryBuilder('prohibiciones_anticipadas')
    .select(['prohibiciones_anticipadas.id_prohibicion_anticipada', 'prohibiciones_anticipadas.apellido_visita', 'prohibiciones_anticipadas.nombre_visita', 'prohibiciones_anticipadas.dni_visita','prohibiciones_anticipadas.vigente']) // Campos específicos
    .leftJoinAndSelect('prohibiciones_anticipadas.sexo', 'sexo') // Relación
    .where('prohibiciones_anticipadas.apellido_visita LIKE :apellido', {apellido: `%${apellidox}%`})
    .orderBy('prohibiciones_anticipadas.apellido_visita', 'ASC')
    .getMany();
  }
  //FIN BUSCAR LISTA POR APELLIDO....................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.prohibicionAnticipadaRepository.findOneBy({id_prohibicion_anticipada: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //LEVANTAR MANUAL >> accion: prohibir o levantar
  async levantarManualmente(id: number, dataRequest: LevantarManualProhibicionAnticipadaDto, accion: string, usuario: Usuario) {
    
    let dataProhibicion: CreateProhibicionesAnticipadaDto = new CreateProhibicionesAnticipadaDto;
    let dataBitacora: CreateBitacoraProhibicionesAnticipadaDto = new CreateBitacoraProhibicionesAnticipadaDto;
        
    try{
      //buscar prohibicion antes de modificar los datos  
      dataProhibicion = await this.findOne(id);
      
      //verificar si el organismo de la prohibicion corresponde al organismo del usuario
      if(dataProhibicion.organismo_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar esta prohibición. No coincide el organismo al que pertece el usuario con el organismo que creo esta prohibición.");

      if(!dataProhibicion.vigente){
        throw new NotFoundException("No se puede levantar ésta prohibicion. Ya se encontraba levantada.");
      }

      //controlar si la fecha inicio es menor o igual a la fecha_fin enviada en el levantamiento
      if(dataProhibicion.fecha_inicio > dataRequest.fecha_fin) throw new ConflictException("La fecha_inicio no puede ser mayor que la fecha_fin.")
      

      //prepara los primeros datos para la bitacora de la prohibicion
      let fecha_actual: any = new Date().toISOString().split('T')[0];         

      dataBitacora.prohibicion_anticipada_id = dataProhibicion.id_prohibicion_anticipada;
      dataBitacora.motivo = "LEVANTAMIENTO MANUAL";
      dataBitacora.detalle_motivo = dataRequest.detalle_motivo;
      dataBitacora.fecha_cambio = fecha_actual;
      dataBitacora.organismo_id = usuario.organismo_id;
      dataBitacora.usuario_id = usuario.id_usuario;
      dataBitacora.datos_modificados = "fecha_fin cambió de " + dataProhibicion.fecha_fin + " a " + dataRequest.fecha_fin + " ;";
      
      //carga de datos a modificar
      dataProhibicion.vigente = false;
      dataProhibicion.tipo_levantamiento = "LEV. MANUAL";
      dataProhibicion.fecha_fin = dataRequest.fecha_fin;

      //guardadr modificacion registro
      //guardar el levantamineto
      const respuestaProhibicion = await this.prohibicionAnticipadaRepository.update(id, dataProhibicion);
      
      
      //guardar bitacora de prhibicion
      if((await respuestaProhibicion.affected == 1)){
                        
        await this.bitacoraProhibicionesAnticipadasService.create(dataBitacora);
      }

      return respuestaProhibicion;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
    
  }  
  //FIN LEVANTAR PROHIBICION MANUAL..........................................................

  //LEVANTAR AUTOMATICO
  async levantarAutomatico(usuario: Usuario) {
    
    let dataProhibicion: CreateProhibicionesAnticipadaDto = new CreateProhibicionesAnticipadaDto;
     
    try{      
      //prepara los primeros datos para la bitacora de la prohibicion
      let fechaActual: any = new Date().toISOString().split('T')[0];         
      
      //carga de datos a modificar
      dataProhibicion.vigente = false;
      dataProhibicion.tipo_levantamiento = "LEV. AUTOMATICO";

      //guardadr modificacion registro
      //guardar el levantamineto
      const respuestaProhibicion = await this.prohibicionAnticipadaRepository
            .createQueryBuilder()
            .update()
            .set(dataProhibicion)
            .where("fecha_fin < :fechaActual", { fechaActual: fechaActual })
            .andWhere('organismo_id = :id_organismo', {id_organismo: usuario.organismo_id})
            .andWhere('vigente = :vigente', {vigente: true})
            .execute();

      return respuestaProhibicion;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
    
  }  
  //FIN LEVANTAR PROHIBICION AUTOMATICO..........................................................
    
  //MODIFICAR
  async update(id: number, data: UpdateProhibicionesAnticipadaDto, usuario:Usuario) {
    
    let dataBitacora: CreateBitacoraProhibicionesAnticipadaDto = new CreateBitacoraProhibicionesAnticipadaDto;
        
    //separar detalle_motivo 
    
    //quitar propiedad detalle_motivo que no pertenece al entity
    const { detalle_motivo, ...nuevaData } = data;
    
    try{
      //buscar prohibicion antes de modificar
      let dataProhibicionActual = await this.findOne(id);
      
      //verificar si el organismo de la prohibicion corresponde al organismo del usuario
      if(dataProhibicionActual.organismo_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar esta prohibición. No coincide el organismo al que pertece el usuario con el organismo que creo esta prohibición.");
      
      //verificar si la prohibicion esta vigente, solo se modifican prohibiciones vigentes
      if(!dataProhibicionActual.vigente) 
        throw new NotFoundException("No se puede modificar una prohibicion que no este vigente");
      
      //controlar si la fecha inicio es menor o igual a la fecha de fin
      if(data.fecha_inicio > data.fecha_fin) throw new ConflictException("La fecha_inicio no puede ser mayor que la fecha_fin.")
      
      //verificar datos modificados
      //obtener datos actuales de la prohibicion y armar la data actual para comparar
      const dataActualComparar = new UpdateProhibicionesAnticipadaDto;
      dataActualComparar.apellido_interno = dataProhibicionActual.apellido_interno;
      dataActualComparar.apellido_visita = dataProhibicionActual.apellido_visita;
      dataActualComparar.detalle = dataProhibicionActual.detalle;
      dataActualComparar.dni_visita = dataProhibicionActual.dni_visita;
      dataActualComparar.nombre_interno = dataProhibicionActual.nombre_interno;
      dataActualComparar.nombre_visita = dataProhibicionActual.nombre_visita;
      dataActualComparar.sexo_id = dataProhibicionActual.sexo_id;
      dataActualComparar.is_exinterno = dataProhibicionActual.is_exinterno;
      dataActualComparar.fecha_inicio = dataProhibicionActual.fecha_inicio;
      dataActualComparar.fecha_fin = dataProhibicionActual.fecha_fin;
      console.log("datos actual", dataActualComparar);
      console.log("datos enviado", nuevaData);
      //comparar la data enviada en la request con la data actual almacendada en bd
      const datosModificados = this.getReadableDifferences(dataActualComparar, nuevaData);
      
      //cuando no hay campos modificados
      if(datosModificados == "") throw new NotFoundException("Los datos enviados para actualizar el registro son los mismos que los almacenados actualmente.");

      //preparar datos para la bitacora      
      let fecha_actual: any = new Date().toISOString().split('T')[0];        

      dataBitacora.prohibicion_anticipada_id = dataProhibicionActual.id_prohibicion_anticipada;
      dataBitacora.motivo = "MODIFICACION DE DATOS PRINCIPALES";
      dataBitacora.detalle_motivo = detalle_motivo;
      dataBitacora.fecha_cambio = fecha_actual;
      dataBitacora.organismo_id = usuario.organismo_id;
      dataBitacora.usuario_id = usuario.id_usuario;
      dataBitacora.datos_modificados = datosModificados;
      console.log("datos", datosModificados);
      
      //actualiza la prohibicion
      const respuesta = await this.prohibicionAnticipadaRepository.update(id, nuevaData);

      //guardar bitacora de prohibicion
      if((await respuesta).affected == 1){
                
        await this.bitacoraProhibicionesAnticipadasService.create(dataBitacora);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN MODIFICAR DATOS......................................................................
 
  
  //MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
  }
  //FIN MANEJO DE ERRORES........................................

  //COMPARAR Y OBTENER DIFERENCIAS ENTRE OBJETOS
  private getReadableDifferences<T>(obj1: T, obj2: T): string {
    let result = "";

    for (const key in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        const value1 = obj1[key];
        const value2 = obj2[key];
  
        if (value1 !== value2) {
          result += `${key} cambió de '${value1}' a '${value2}'; `;
        }
      }
    }

    return result.trim();
  }

}


