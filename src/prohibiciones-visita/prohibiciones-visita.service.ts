import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProhibicionesVisitaDto } from './dto/create-prohibiciones-visita.dto';
import { UpdateProhibicionesVisitaDto } from './dto/update-prohibiciones-visita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProhibicionVisita } from './entities/prohibiciones-visita.entity';
import { Repository } from 'typeorm';
import { BitacoraProhibicionVisita } from 'src/bitacora-prohibiciones-visita/entities/bitacora-prohibiciones-visita.entity';
import { BitacoraProhibicionesVisitaService } from 'src/bitacora-prohibiciones-visita/bitacora-prohibiciones-visita.service';
import { CreateBitacoraProhibicionesVisitaDto } from 'src/bitacora-prohibiciones-visita/dto/create-bitacora-prohibiciones-visita.dto';
import { LevantarManualProhibicionesVisitaDto } from './dto/levantar-manual-prohibiciones-visita.dto';
import { AnularProhibicionesVisitaDto } from './dto/anular-prohibiciones-visita.dto';

@Injectable()
export class ProhibicionesVisitaService {
  
  constructor(
    @InjectRepository(ProhibicionVisita)
    private readonly prohibicionVisitaRepository: Repository<ProhibicionVisita>,
    private readonly bitacoraProhibicionesVisitaService: BitacoraProhibicionesVisitaService
  ){}

  async create(data: CreateProhibicionesVisitaDto): Promise<ProhibicionVisita> {
    
    let fecha_actual: any = new Date().toISOString().split('T')[0];               
    
    //cargar datos por defecto
    data.fecha_prohibicion = fecha_actual

    try {
      
      const nuevo = await this.prohibicionVisitaRepository.create(data);
      let respuesta = await this.prohibicionVisitaRepository.save(nuevo);

      // if(respuesta){
      //   let fecha_actual: any = new Date().toISOString().split('T')[0];
      //   let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
        
      //   dataBitacora.prohibicion_visita_id = respuesta.id_prohibicion_visita;
      //   dataBitacora.disposicion = respuesta.disposicion;
      //   dataBitacora.detalle = respuesta.detalle;
      //   dataBitacora.fecha_inicio = respuesta.fecha_inicio;
      //   dataBitacora.fecha_fin = respuesta.fecha_fin;
      //   dataBitacora.vigente = respuesta.vigente;
      //   dataBitacora.anulado = respuesta.anulado;
      //   dataBitacora.motivo = "CREACION PROHIBICION";
      //   dataBitacora.detalle_motivo = "CREACION PROHIBICION";
      //   dataBitacora.usuario_id = 2;
      //   dataBitacora.fecha_cambio = fecha_actual;
                
      //   await this.bitacoraProhibicionesVisitaService.create(dataBitacora);

      // }

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
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.prohibicionVisitaRepository.find(
        {        
          where: {
            ciudadano_id: id_ciudanox
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
  async levantarYProhibirManualmente(id: number, data: LevantarManualProhibicionesVisitaDto, accion: string) {
    
    let dataProhibicionActual: CreateProhibicionesVisitaDto = new CreateProhibicionesVisitaDto;
    let motivo: string="";

    try{
      //buscar prohibicion antes de modificar los datos  
      dataProhibicionActual = await this.findOne(id);
      
      //identificar si se levanta o vuelve a prohibir y verificar si corresponde hacerlo  
      if(accion == "levantar"){
        if(!dataProhibicionActual.vigente){
          throw new NotFoundException("No se puede levantar ésta prohibicion. Ya se encontraba levantada.");
        }

        motivo = "LEVANTAMIENTO MANUAL";
        dataProhibicionActual.vigente = false;
      }
  
      if(accion == "prohibir"){
        if(dataProhibicionActual.vigente){
          throw new NotFoundException("No se puede realizar la prohibición. Ya se encontraba prohibida.");
        }

        motivo = "VOLVER A PROHIBIR";
        dataProhibicionActual.vigente = true;
      }

      //guardar el levantamineto o prohibicion
      const respuestaProhibicion = await this.prohibicionVisitaRepository.update(id, dataProhibicionActual);
      
      //guardadr modificacion registro
      if((await respuestaProhibicion.affected == 1)){
        //guardar bitacora de prhibicion
        let fecha_actual: any = new Date().toISOString().split('T')[0];
        let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
        
        dataBitacora.prohibicion_visita_id = dataProhibicionActual.id_prohibicion_visita;
        dataBitacora.disposicion = dataProhibicionActual.disposicion;
        dataBitacora.detalle = dataProhibicionActual.detalle;
        dataBitacora.fecha_inicio = dataProhibicionActual.fecha_inicio;
        dataBitacora.fecha_fin = dataProhibicionActual.fecha_fin;
        dataBitacora.vigente = dataProhibicionActual.vigente;
        dataBitacora.anulado = dataProhibicionActual.anulado;
        dataBitacora.motivo = motivo;
        dataBitacora.detalle_motivo = data.detalle_motivo;
        dataBitacora.usuario_id = 2;
        dataBitacora.fecha_cambio = fecha_actual;
                
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
  async anularProhibicion(id: number, data: AnularProhibicionesVisitaDto) {
    
    let dataProhibicion: CreateProhibicionesVisitaDto = new CreateProhibicionesVisitaDto;
    dataProhibicion.anulado = true;
    
    try{
      //buscar prohibicion antes de modificar los datos 
      dataProhibicion = await this.findOne(id);

      //actualiza en anulado
      const respuesta = await this.prohibicionVisitaRepository.update(id, dataProhibicion);

      if((await respuesta).affected == 1){

        //guardar bitacora de prhibicion         
        let fecha_actual: any = new Date().toISOString().split('T')[0];
        let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
        
        dataBitacora.prohibicion_visita_id = dataProhibicion.id_prohibicion_visita;
        dataBitacora.disposicion = dataProhibicion.disposicion;
        dataBitacora.detalle = dataProhibicion.detalle;
        dataBitacora.fecha_inicio = dataProhibicion.fecha_inicio;
        dataBitacora.fecha_fin = dataProhibicion.fecha_fin;
        dataBitacora.vigente = dataProhibicion.vigente;
        dataBitacora.anulado = dataProhibicion.anulado;
        dataBitacora.motivo = "ANULAR PROHIBICION";
        dataBitacora.detalle_motivo = data.detalle_motivo;
        dataBitacora.usuario_id = 2;
        dataBitacora.fecha_cambio = fecha_actual;
                
        await this.bitacoraProhibicionesVisitaService.create(dataBitacora);
      } 

      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN ANULAR PROHIBICION

  async update(id: number, data: UpdateProhibicionesVisitaDto) {
    //separar detalle_motivo 
    const { detalle_motivo, ...nuevaData } = data;
    
    try{
      const respuesta = await this.prohibicionVisitaRepository.update(id, nuevaData);
      if((await respuesta).affected == 1){

        //guardar bitacora de prohibicion
        let dataProhibicion = await this.findOne(id);
        let fecha_actual: any = new Date().toISOString().split('T')[0];
        let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
        
        dataBitacora.prohibicion_visita_id = dataProhibicion.id_prohibicion_visita;
        dataBitacora.disposicion = dataProhibicion.disposicion;
        dataBitacora.detalle = dataProhibicion.detalle;
        dataBitacora.fecha_inicio = dataProhibicion.fecha_inicio;
        dataBitacora.fecha_fin = dataProhibicion.fecha_fin;
        dataBitacora.vigente = dataProhibicion.vigente;
        dataBitacora.anulado = dataProhibicion.anulado;
        dataBitacora.motivo = "MODIFICACION PROHIBICION";
        dataBitacora.detalle_motivo = detalle_motivo;
        dataBitacora.usuario_id = 2;
        dataBitacora.fecha_cambio = fecha_actual;
                
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
