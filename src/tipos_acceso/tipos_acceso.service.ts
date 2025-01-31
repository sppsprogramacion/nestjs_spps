import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTiposAccesoDto } from './dto/create-tipos_acceso.dto';
import { UpdateTiposAccesoDto } from './dto/update-tipos_acceso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoAcceso } from './entities/tipos_acceso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposAccesoService {
  
  constructor(
    @InjectRepository(TipoAcceso)
    private readonly tipoAccesoRepository: Repository<TipoAcceso>
  ){}

  async create(data: CreateTiposAccesoDto): Promise<TipoAcceso> {

    try {
      
      const nuevo = await this.tipoAccesoRepository.create(data);
      return await this.tipoAccesoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.tipoAccesoRepository.find(
      {
          order:{
              tipo_acceso: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.tipoAccesoRepository.findOneBy({id_tipo_acceso: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTiposAccesoDto) {

    try{
      const respuesta = await this.tipoAccesoRepository.update(id, data);
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
    const respuesta = await this.tipoAccesoRepository.findOneBy({id_tipo_acceso: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de tipo_acceso que intenta eliminar");
    return await this.tipoAccesoRepository.remove(respuesta);
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
