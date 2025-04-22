import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProhibicionesVisitaDto } from './dto/create-prohibiciones-visita.dto';
import { UpdateProhibicionesVisitaDto } from './dto/update-prohibiciones-visita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProhibicionVisita } from './entities/prohibiciones-visita.entity';
import { Repository } from 'typeorm';
import { BitacoraProhibicionesVisitaService } from 'src/bitacora-prohibiciones-visita/bitacora-prohibiciones-visita.service';
import { CreateBitacoraProhibicionesVisitaDto } from 'src/bitacora-prohibiciones-visita/dto/create-bitacora-prohibiciones-visita.dto';
import { LevantarManualProhibicionesVisitaDto } from './dto/levantar-manual-prohibiciones-visita.dto';
import { AnularProhibicionesVisitaDto } from './dto/anular-prohibiciones-visita.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class ProhibicionesVisitaService {
  
  constructor(
    @InjectRepository(ProhibicionVisita)
    private readonly prohibicionVisitaRepository: Repository<ProhibicionVisita>,
    private readonly bitacoraProhibicionesVisitaService: BitacoraProhibicionesVisitaService
  ){}

  async create(data: CreateProhibicionesVisitaDto, usuario: Usuario): Promise<ProhibicionVisita> {
    
    let fecha_actual: any = new Date().toISOString().split('T')[0];               
    
    //cargar datos por defecto
    data.fecha_prohibicion = fecha_actual;
    data.usuario_id = usuario.id_usuario;
    data.organismo_id = usuario.organismo_id;
    
    try {
      
      const nuevo = await this.prohibicionVisitaRepository.create(data);
      let respuesta = await this.prohibicionVisitaRepository.save(nuevo);
      
      return respuesta;
    }catch (error) {
      
      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.prohibicionVisitaRepository.find(
      {
          order:{
              id_prohibicion_visita: "DESC"
          }
      }
    );
  }

  //BUSCAR  XCIUDADANO
  async findXCiudano(id_ciudanox: number) { 
      const prohibiciiones = await this.prohibicionVisitaRepository.find(
        {        
          where: {
            ciudadano_id: id_ciudanox,
            anulado: false
          },
          order:{
            id_prohibicion_visita: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR  XORGANISMO
  async findXOrganismo(id_organismox: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.prohibicionVisitaRepository.find(
        {        
          where: {
            organismo_id: id_organismox
          },
          order:{
            id_prohibicion_visita: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XORGANISMO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.prohibicionVisitaRepository.findOneBy({id_prohibicion_visita: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //LEVANTAR/PROHIBIR MANUAL >> accion: prohibir o levantar
  async levantarYProhibirManualmente(id: number, data: LevantarManualProhibicionesVisitaDto, accion: string, usuario: Usuario) {
    
    let dataProhibicion: CreateProhibicionesVisitaDto = new CreateProhibicionesVisitaDto;
    let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
    let motivo: string="";
    
    try{
      //buscar prohibicion antes de modificar los datos  
      dataProhibicion = await this.findOne(id);
      
      //verificar si el organismo de la prohibicion corresponde al organismo del usuario
      if(dataProhibicion.organismo_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar esta prohibición. No coincide el organismo al que pertece el usuario con el organismo que creo esta prohibición.");

      //prepara los primeros datos para la bitacora de la prohibicion
      let fecha_actual: any = new Date().toISOString().split('T')[0];      
      dataBitacora.prohibicion_visita_id = dataProhibicion.id_prohibicion_visita;
      dataBitacora.disposicion = dataProhibicion.disposicion;
      dataBitacora.detalle = dataProhibicion.detalle;
      dataBitacora.fecha_inicio = dataProhibicion.fecha_inicio;
      dataBitacora.fecha_fin = dataProhibicion.fecha_fin;
      dataBitacora.vigente = dataProhibicion.vigente;
      dataBitacora.anulado = dataProhibicion.anulado;      
      dataBitacora.usuario_id = usuario.id_usuario;
      dataBitacora.fecha_cambio = fecha_actual;
      
      //identificar si se levanta o vuelve a prohibir y verificar si corresponde hacerlo  
      if(accion == "levantar"){
        if(!dataProhibicion.vigente){
          throw new NotFoundException("No se puede levantar ésta prohibicion. Ya se encontraba levantada.");
        }

        motivo = "LEVANTAMIENTO MANUAL";
        //carga de datos a modificar
        dataProhibicion.vigente = false;
        dataProhibicion.tipo_levantamiento = "LEV. MANUAL";
        dataProhibicion.fecha_fin = data.fecha_fin;
      }
  
      if(accion == "prohibir"){
        if(dataProhibicion.vigente){
          throw new NotFoundException("No se puede realizar la prohibición. Ya se encontraba prohibida.");
        }

        motivo = "VOLVER A PROHIBIR";
        //carga de datos a modificar
        dataProhibicion.vigente = true;
        dataProhibicion.fecha_fin = data.fecha_fin;
      }

      //guardadr modificacion registro
      //guardar el levantamineto o prohibicion
      const respuestaProhibicion = await this.prohibicionVisitaRepository.update(id, dataProhibicion);
      
      
      //guardar bitacora de prhibicion
      if((await respuestaProhibicion.affected == 1)){
        //completar datos para la bitacora
        dataBitacora.motivo = motivo;
        dataBitacora.detalle_motivo = data.detalle_motivo;
                
        await this.bitacoraProhibicionesVisitaService.create(dataBitacora);
      }

      return respuestaProhibicion;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
    
  }  
  //FIN LEVANTAR PROHIBICION MANUAL

  //ANULAR PROHIBICION
  async anularProhibicion(id: number, data: AnularProhibicionesVisitaDto, usuario: Usuario) {
    
    let dataProhibicion: CreateProhibicionesVisitaDto = new CreateProhibicionesVisitaDto;
    let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
    
    try{
      //buscar prohibicion antes de modificar los datos 
      dataProhibicion = await this.findOne(id);

      //verificar si el organismo de la prohibicion corresponde al organismo del usuario
      if(dataProhibicion.organismo_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar esta prohibición. No coincide el organismo al que pertece el usuario con el organismo que creo esta prohibición.");
    
      //verificar si la prohibicion esta vigente, solo se anulan prohibiciones vigentes
      if(dataProhibicion.anulado) 
        throw new NotFoundException("No se puede anular. La prohibicion ya se encontraba anulada.");

      //verificar si la prohibicion esta vigente, solo se anulan prohibiciones vigentes
      if(!dataProhibicion.vigente) 
        throw new NotFoundException("No se puede anular una prohibicion que no este vigente");
    

      //preparar datos para la bitacora
      let fecha_actual: any = new Date().toISOString().split('T')[0];        
      dataBitacora.prohibicion_visita_id = dataProhibicion.id_prohibicion_visita;
      dataBitacora.disposicion = dataProhibicion.disposicion;
      dataBitacora.detalle = dataProhibicion.detalle;
      dataBitacora.fecha_inicio = dataProhibicion.fecha_inicio;
      dataBitacora.fecha_fin = dataProhibicion.fecha_fin;
      dataBitacora.vigente = dataProhibicion.vigente;
      dataBitacora.anulado = dataProhibicion.anulado;
      dataBitacora.motivo = "ANULAR PROHIBICION";
      dataBitacora.detalle_motivo = data.detalle_motivo;
      dataBitacora.usuario_id = usuario.id_usuario;
      dataBitacora.fecha_cambio = fecha_actual;

      //actualiza la prohibicion en anulado
      dataProhibicion.anulado = true;
      const respuesta = await this.prohibicionVisitaRepository.update(id, dataProhibicion);
      
      //guardar bitacora de prhibicion
      if((await respuesta).affected == 1){

        await this.bitacoraProhibicionesVisitaService.create(dataBitacora);
      } 

      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN ANULAR PROHIBICION

  async update(id: number, data: UpdateProhibicionesVisitaDto, usuario:Usuario) {
    let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
        
    //separar detalle_motivo 
    const { detalle_motivo, ...nuevaData } = data;
    
    try{
      //buscar prohibicion antes de modificar
      let dataProhibicion = await this.findOne(id);
      
      //verificar si el organismo de la prohibicion corresponde al organismo del usuario
      if(dataProhibicion.organismo_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar esta prohibición. No coincide el organismo al que pertece el usuario con el organismo que creo esta prohibición.");
      
      //verificar si la prohibicion esta vigente, solo se modifican prohibiciones vigentes
      if(dataProhibicion.anulado) 
        throw new NotFoundException("No se puede modificar una prohibicion anulada.");

      //verificar si la prohibicion esta vigente, solo se modifican prohibiciones vigentes
      if(!dataProhibicion.vigente) 
        throw new NotFoundException("No se puede modificar una prohibicion que no este vigente");
    

      //preparar datos para la bitacora      
      let fecha_actual: any = new Date().toISOString().split('T')[0];        
      dataBitacora.prohibicion_visita_id = dataProhibicion.id_prohibicion_visita;
      dataBitacora.disposicion = dataProhibicion.disposicion;
      dataBitacora.detalle = dataProhibicion.detalle;
      dataBitacora.fecha_inicio = dataProhibicion.fecha_inicio;
      dataBitacora.fecha_fin = dataProhibicion.fecha_fin;
      dataBitacora.vigente = dataProhibicion.vigente;
      dataBitacora.anulado = dataProhibicion.anulado;
      dataBitacora.motivo = "MODIFICACION PROHIBICION";
      dataBitacora.detalle_motivo = detalle_motivo;
      dataBitacora.usuario_id = usuario.id_usuario;
      dataBitacora.fecha_cambio = fecha_actual;

      //actualiza la prohibicion
      const respuesta = await this.prohibicionVisitaRepository.update(id, nuevaData);

      //guardar bitacora de prohibicion
      if((await respuesta).affected == 1){
                
        await this.bitacoraProhibicionesVisitaService.create(dataBitacora);
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
