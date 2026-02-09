import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReincidenciaDto } from './dto/create-reincidencia.dto';
import { UpdateReincidenciaDto } from './dto/update-reincidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reincidencia } from './entities/reincidencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReincidenciaService {
  
  constructor(
    @InjectRepository(Reincidencia)
    private readonly reincidenciaRepository: Repository<Reincidencia>
  ){}
  
  async create(data: CreateReincidenciaDto): Promise<Reincidencia> {

    try {
      
      const nuevo = await this.reincidenciaRepository.create(data);
      return await this.reincidenciaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.reincidenciaRepository.find(
      {
          order:{
              reincidencia: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.reincidenciaRepository.findOneBy({id_reincidencia: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdateReincidenciaDto) {

    try{
      const respuesta = await this.reincidenciaRepository.update(id, data);
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
