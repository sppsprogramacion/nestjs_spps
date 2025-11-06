import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReingresoDto } from './dto/create-reingreso.dto';
import { UpdateReingresoDto } from './dto/update-reingreso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reingreso } from './entities/reingreso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReingresoService {
  
  constructor(
    @InjectRepository(Reingreso)
    private readonly reingresoRepository: Repository<Reingreso>
  ){}

  async create(data: CreateReingresoDto): Promise<Reingreso> {

    try {
      
      const nuevo = await this.reingresoRepository.create(data);
      return await this.reingresoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.reingresoRepository.find(
      {
          order:{
              reingreso: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.reingresoRepository.findOneBy({id_reingreso: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateReingresoDto) {

    try{
      const respuesta = await this.reingresoRepository.update(id, data);
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
