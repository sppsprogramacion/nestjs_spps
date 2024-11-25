import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNacionalidadeDto } from './dto/create-nacionalidade.dto';
import { UpdateNacionalidadeDto } from './dto/update-nacionalidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nacionalidad } from './entities/nacionalidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NacionalidadesService {
  constructor(
    @InjectRepository(Nacionalidad)
    private readonly nacionalidadRepository: Repository<Nacionalidad>
  ){}

  async create(data: CreateNacionalidadeDto): Promise<Nacionalidad> {

    try {
      
      const nuevo = await this.nacionalidadRepository.create(data);
      return await this.nacionalidadRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.nacionalidadRepository.find(
      {
          order:{
              nacionalidad: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.nacionalidadRepository.findOneBy({id_nacionalidad: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdateNacionalidadeDto) {

    try{
      const respuesta = await this.nacionalidadRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }

  async remove(id: string) {
    const respuesta = await this.nacionalidadRepository.findOneBy({id_nacionalidad: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de pais que intenta eliminar");
    return await this.nacionalidadRepository.remove(respuesta);
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
