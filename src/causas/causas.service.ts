import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCausaDto } from './dto/create-causa.dto';
import { UpdateCausaDto } from './dto/update-causa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Causa } from './entities/causa.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class CausasService {

  constructor(
    @InjectRepository(Causa)
    private readonly causaRepository: Repository<Causa>
  ){}

  //NUEVO
  async create(data: CreateCausaDto, usuario: Usuario): Promise<Causa> {

      let fecha_actual: any = new Date().toISOString().split('T')[0];               
      
      //cargar datos por defecto
      data.fecha_carga = fecha_actual;
      data.usuario_carga_id = usuario.id_usuario;
      data.organismo_carga_id = usuario.organismo_id;
      
      try {
        
        const nuevo = await this.causaRepository.create(data);
        let respuesta = await this.causaRepository.save(nuevo);
        
        return respuesta;
      }catch (error) {
        
        this.handleDBErrors(error);  
      }     
    }
  //FIN NUEVO........................................

  //BUSCAR TODOS
  async findAll() {
    return await this.causaRepository.find(
      {
          order:{
              id_causa: "ASC"
          }
      }
    );
  }
  //FIN BUSCAR TODOS...........................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.causaRepository.findOneBy({id_causa: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, dataUpdate: UpdateCausaDto, usuario:Usuario) {
      //et dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
          
      //separar detalle_motivo 
      //const { detalle_motivo, ...nuevaData } = data;
      
      try{
        //buscar prohibicion antes de modificar
        let dataCausa = await this.findOne(id);
        
        //verificar si el organismo de la prohibicion corresponde al organismo del usuario
        if(dataCausa.organismo_carga_id != usuario.organismo_id) 
          throw new NotFoundException("No tiene acceso a modificar esta prohibición. No coincide el organismo al que pertece el usuario con el organismo que creo esta prohibición.");
        
        //verificar si la prohibicion esta anulado, solo se modifican prohibiciones vigentes
        if(dataCausa.eliminado) 
          throw new NotFoundException("No se puede modificar una prohibicion eliminada.");
  
        //verificar si la prohibicion esta vigente, solo se modifican prohibiciones vigentes
        if(!dataCausa.vigente) 
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
  
        // dataBitacora.organismo_id = usuario.organismo_id;
        // dataBitacora.usuario_id = usuario.id_usuario;
        // dataBitacora.fecha_cambio = fecha_actual;
  
        //actualiza la prohibicion
        const respuesta = await this.causaRepository.update(id, dataUpdate);
  
        //guardar bitacora de prohibicion
        // if((await respuesta).affected == 1){
                  
        //   await this.bitacoraProhibicionesVisitaService.create(dataBitacora);
        // } 
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
