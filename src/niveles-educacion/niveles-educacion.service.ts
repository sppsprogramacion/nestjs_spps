import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNivelesEducacionDto } from './dto/create-niveles-educacion.dto';
import { UpdateNivelesEducacionDto } from './dto/update-niveles-educacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NivelEducacion } from './entities/niveles-educacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NivelesEducacionService {
  constructor(
    @InjectRepository(NivelEducacion)
    private readonly nivelEducacionRepository: Repository<NivelEducacion>
  ){}

  async create(data: CreateNivelesEducacionDto): Promise<NivelEducacion> {

    try {
      
      const nuevo = await this.nivelEducacionRepository.create(data);
      return await this.nivelEducacionRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.nivelEducacionRepository.find(
      {
          order:{
              nivel_educacion: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.nivelEducacionRepository.findOneBy({id_nivel_educacion: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateNivelesEducacionDto) {

    try{
      const respuesta = await this.nivelEducacionRepository.update(id, data);
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
    const respuesta = await this.nivelEducacionRepository.findOneBy({id_nivel_educacion: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de nivel_educacion que intenta eliminar");
    return await this.nivelEducacionRepository.remove(respuesta);
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
