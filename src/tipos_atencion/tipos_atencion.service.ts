import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTiposAtencionDto } from './dto/create-tipos_atencion.dto';
import { UpdateTiposAtencionDto } from './dto/update-tipos_atencion.dto';
import { TipoAtencion } from './entities/tipos_atencion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TiposAtencionService {
  
  constructor(
    @InjectRepository(TipoAtencion)
    private readonly tipoAtencionRepository: Repository<TipoAtencion>
  ){}

  async create(data: CreateTiposAtencionDto): Promise<TipoAtencion> {

    try {
      
      const nuevo = await this.tipoAtencionRepository.create(data);
      return await this.tipoAtencionRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.tipoAtencionRepository.find(
      {
          order:{
              tipo_atencion: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.tipoAtencionRepository.findOneBy({id_tipo_atencion: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTiposAtencionDto) {

    try{
      const respuesta = await this.tipoAtencionRepository.update(id, data);
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
    const respuesta = await this.tipoAtencionRepository.findOneBy({id_tipo_atencion: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de tipo_atencion que intenta eliminar");
    return await this.tipoAtencionRepository.remove(respuesta);
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
