import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMotivosAtencionDto } from './dto/create-motivos_atencion.dto';
import { UpdateMotivosAtencionDto } from './dto/update-motivos_atencion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MotivoAtencion } from './entities/motivos_atencion.entity';
import { Repository } from 'typeorm';
import { OrganismosDestinoService } from 'src/organismos_destino/organismos_destino.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class MotivosAtencionService {
  
  constructor(
    @InjectRepository(MotivoAtencion)
    private readonly motivoAtencionRepository: Repository<MotivoAtencion>,
    
    private readonly organismosDestinoService: OrganismosDestinoService
  ){}

  async create(data: CreateMotivosAtencionDto): Promise<MotivoAtencion> {

    try {
      
      const nuevo = await this.motivoAtencionRepository.create(data);
      return await this.motivoAtencionRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.motivoAtencionRepository.find(
      {
          order:{
              motivo_atencion: "ASC"
          }
      }
    );
  }

  //BUSCAR  XORGANISMO DESTINO
    async findXOrganismo(id_organismox: number, usuario: Usuario) { 
      
      let organismoDestino = await this.organismosDestinoService.findOne(id_organismox);    
  
      if (!organismoDestino) throw new NotFoundException("El organismo no existe.");
  
      if(organismoDestino.organismo_depende != usuario.organismo_id) throw new NotFoundException("El organismo no es accesible por este usuario");
  
      let motivos: any;   
  
      //cuando el organismo es una unidad carcelaria o alcaidia
      if(organismoDestino.es_unidad_carcelaria){     
        motivos = await this.motivoAtencionRepository.find(
          {          
            where: [
              { organismo_destino_id: id_organismox },
              { organismo_destino_id: 22 }
            ],
            order:{
              motivo_atencion: "ASC"
            }
          }
        );  
      }
      
      //cuando el organismo no es una unidad carcelaria o alcaidia
      if(!organismoDestino.es_unidad_carcelaria){
        //cuando el organismo NO ES una unidad carcelaria o alcaidia
        motivos = await this.motivoAtencionRepository.find(
          {          
            where: {
              organismo_destino_id: id_organismox
            },
            order:{
              motivo_atencion: "ASC"
            }
          }
        ); 
      }
          
      return motivos;
      
    }
    //FIN BUSCAR  XORGANISMO DESTINO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.motivoAtencionRepository.findOneBy({id_motivo_atencion: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateMotivosAtencionDto) {

    try{
      const respuesta = await this.motivoAtencionRepository.update(id, data);
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
    const respuesta = await this.motivoAtencionRepository.findOneBy({id_motivo_atencion: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de motivo_atencion que intenta eliminar");
    return await this.motivoAtencionRepository.remove(respuesta);
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
