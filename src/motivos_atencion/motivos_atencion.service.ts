import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMotivosAtencionDto } from './dto/create-motivos_atencion.dto';
import { UpdateMotivosAtencionDto } from './dto/update-motivos_atencion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MotivoAtencion } from './entities/motivos_atencion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MotivosAtencionService {
  
  constructor(
    @InjectRepository(MotivoAtencion)
    private readonly motivoAtencionRepository: Repository<MotivoAtencion>
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
