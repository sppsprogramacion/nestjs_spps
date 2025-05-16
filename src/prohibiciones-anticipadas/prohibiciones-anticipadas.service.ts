import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProhibicionesAnticipadaDto } from './dto/create-prohibiciones-anticipada.dto';
import { UpdateProhibicionesAnticipadaDto } from './dto/update-prohibiciones-anticipada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProhibicionAnticipada } from './entities/prohibiciones-anticipada.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateProhibicionesVisitaDto } from 'src/prohibiciones-visita/dto/update-prohibiciones-visita.dto';

@Injectable()
export class ProhibicionesAnticipadasService {
  constructor(
      @InjectRepository(ProhibicionAnticipada)
      private readonly prohibicionAnticipadaRepository: Repository<ProhibicionAnticipada>,
      //private readonly bitacoraProhibicionesVisitaService: BitacoraProhibicionesVisitaService
    ){}


  //NUEVO
    async create(data: CreateProhibicionesAnticipadaDto, usuario: Usuario): Promise<ProhibicionAnticipada> {
      
      let fecha_actual: any = new Date().toISOString().split('T')[0];               
      
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
  
    //BUSCAR  XID
    async findOne(id: number) {
  
      const respuesta = await this.prohibicionAnticipadaRepository.findOneBy({id_prohibicion_anticipada: id});
      if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
      return respuesta;
    }
    //FIN BUSCAR  XID..................................................................
  
    //LEVANTAR/PROHIBIR MANUAL >> accion: prohibir o levantar
    // async levantarYProhibirManualmente(id: number, data: LevantarManualProhibicionesVisitaDto, accion: string, usuario: Usuario) {
      
    //   let dataProhibicion: CreateProhibicionesVisitaDto = new CreateProhibicionesVisitaDto;
    //   let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
    //   let motivo: string="";
      
    //   try{
    //     //buscar prohibicion antes de modificar los datos  
    //     dataProhibicion = await this.findOne(id);
        
    //     //verificar si el organismo de la prohibicion corresponde al organismo del usuario
    //     if(dataProhibicion.organismo_id != usuario.organismo_id) 
    //       throw new NotFoundException("No tiene acceso a modificar esta prohibición. No coincide el organismo al que pertece el usuario con el organismo que creo esta prohibición.");
  
    //     //prepara los primeros datos para la bitacora de la prohibicion
    //     let fecha_actual: any = new Date().toISOString().split('T')[0];      
    //     dataBitacora.prohibicion_visita_id = dataProhibicion.id_prohibicion_visita;
    //     dataBitacora.disposicion = dataProhibicion.disposicion;
    //     dataBitacora.detalle = dataProhibicion.detalle;
    //     dataBitacora.fecha_inicio = dataProhibicion.fecha_inicio;
    //     dataBitacora.fecha_fin = dataProhibicion.fecha_fin;
    //     dataBitacora.vigente = dataProhibicion.vigente;
    //     dataBitacora.anulado = dataProhibicion.anulado;      
    //     dataBitacora.usuario_id = usuario.id_usuario;
    //     dataBitacora.fecha_cambio = fecha_actual;
        
    //     //identificar si se levanta o vuelve a prohibir y verificar si corresponde hacerlo  
    //     if(accion == "levantar"){
    //       if(!dataProhibicion.vigente){
    //         throw new NotFoundException("No se puede levantar ésta prohibicion. Ya se encontraba levantada.");
    //       }
  
    //       motivo = "LEVANTAMIENTO MANUAL";
    //       //carga de datos a modificar
    //       dataProhibicion.vigente = false;
    //       dataProhibicion.tipo_levantamiento = "LEV. MANUAL";
    //       dataProhibicion.fecha_fin = data.fecha_fin;
    //     }
    
    //     if(accion == "prohibir"){
    //       if(dataProhibicion.vigente){
    //         throw new NotFoundException("No se puede realizar la prohibición. Ya se encontraba prohibida.");
    //       }
  
    //       motivo = "VOLVER A PROHIBIR";
    //       //carga de datos a modificar
    //       dataProhibicion.vigente = true;
    //       dataProhibicion.fecha_fin = data.fecha_fin;
    //     }
  
    //     //guardadr modificacion registro
    //     //guardar el levantamineto o prohibicion
    //     const respuestaProhibicion = await this.prohibicionVisitaRepository.update(id, dataProhibicion);
        
        
    //     //guardar bitacora de prhibicion
    //     if((await respuestaProhibicion.affected == 1)){
    //       //completar datos para la bitacora
    //       dataBitacora.motivo = motivo;
    //       dataBitacora.detalle_motivo = data.detalle_motivo;
                  
    //       await this.bitacoraProhibicionesVisitaService.create(dataBitacora);
    //     }
  
    //     return respuestaProhibicion;
    //   }
    //   catch(error){
        
    //     this.handleDBErrors(error); 
    //   }   
      
    // }  
    //FIN LEVANTAR PROHIBICION MANUAL
    
  
    async update(id: number, data: UpdateProhibicionesAnticipadaDto, usuario:Usuario) {
      //let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
          
      //separar detalle_motivo 
      const { detalle_motivo, ...nuevaData } = data;
      
      try{
        //buscar prohibicion antes de modificar
        let dataProhibicion = await this.findOne(id);
        
        //verificar si el organismo de la prohibicion corresponde al organismo del usuario
        if(dataProhibicion.organismo_id != usuario.organismo_id) 
          throw new NotFoundException("No tiene acceso a modificar esta prohibición. No coincide el organismo al que pertece el usuario con el organismo que creo esta prohibición.");
        
        //verificar si la prohibicion esta vigente, solo se modifican prohibiciones vigentes
        // if(dataProhibicion.anulado) 
        //   throw new NotFoundException("No se puede modificar una prohibicion anulada.");
  
        //verificar si la prohibicion esta vigente, solo se modifican prohibiciones vigentes
        if(!dataProhibicion.vigente) 
          throw new NotFoundException("No se puede modificar una prohibicion que no este vigente");
      
  
        //preparar datos para la bitacora      
        let fecha_actual: any = new Date().toISOString().split('T')[0];        
        // dataBitacora.prohibicion_visita_id = dataProhibicion.id_prohibicion_visita;
        // dataBitacora.disposicion = dataProhibicion.disposicion;
        // dataBitacora.detalle = dataProhibicion.detalle;
        // dataBitacora.fecha_inicio = dataProhibicion.fecha_inicio;
        // dataBitacora.fecha_fin = dataProhibicion.fecha_fin;
        // dataBitacora.vigente = dataProhibicion.vigente;
        // dataBitacora.anulado = dataProhibicion.anulado;
        // dataBitacora.motivo = "MODIFICACION PROHIBICION";
        // dataBitacora.detalle_motivo = detalle_motivo;
        // dataBitacora.usuario_id = usuario.id_usuario;
        // dataBitacora.fecha_cambio = fecha_actual;
  
        //actualiza la prohibicion
        const respuesta = await this.prohibicionAnticipadaRepository.update(id, nuevaData);
  
        //guardar bitacora de prohibicion
        if((await respuesta).affected == 1){
                  
          //await this.bitacoraProhibicionesVisitaService.create(dataBitacora);
        } 
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
