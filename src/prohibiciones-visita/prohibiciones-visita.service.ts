import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProhibicionesVisitaDto } from './dto/create-prohibiciones-visita.dto';
import { UpdateProhibicionesVisitaDto } from './dto/update-prohibiciones-visita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProhibicionVisita } from './entities/prohibiciones-visita.entity';
import { Repository } from 'typeorm';
import { BitacoraProhibicionVisita } from 'src/bitacora-prohibiciones-visita/entities/bitacora-prohibiciones-visita.entity';
import { BitacoraProhibicionesVisitaService } from 'src/bitacora-prohibiciones-visita/bitacora-prohibiciones-visita.service';
import { CreateBitacoraProhibicionesVisitaDto } from 'src/bitacora-prohibiciones-visita/dto/create-bitacora-prohibiciones-visita.dto';

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

      if(respuesta){
        console.log("antes de bitacora");
        let dataBitacora: CreateBitacoraProhibicionesVisitaDto;
        
        
        console.log("cargando bitacora");
        await this.bitacoraProhibicionesVisitaService.create(respuesta);

      }

      return respuesta;
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.prohibicionVisitaRepository.find(
      {
          order:{
              fecha_prohibicion: "DESC"
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
            fecha_prohibicion: "DESC"
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
            fecha_prohibicion: "DESC"
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

  async update(id: number, data: UpdateProhibicionesVisitaDto) {

    try{
      const respuesta = await this.prohibicionVisitaRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
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
