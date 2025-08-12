import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateParentescosMenoreDto } from './dto/create-parentescos-menore.dto';
import { ParentescoMenor } from './entities/parentescos-menor.entity';
import { UpdateParentescosMenoreDto } from './dto/update-parentescos-menore.dto';

@Injectable()
export class ParentescosMenoresService {
  

  constructor(
    @InjectRepository(ParentescoMenor)
    private readonly parentescoMenorRepository: Repository<ParentescoMenor>
  ){}

  async create(data: CreateParentescosMenoreDto): Promise<ParentescoMenor> {

    try {
      
      const nuevo = await this.parentescoMenorRepository.create(data);
      return await this.parentescoMenorRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.parentescoMenorRepository.find(
      {
          order:{
              parentesco_menor: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: String) {

    const respuesta = await this.parentescoMenorRepository.findOneBy({id_parentesco_menor: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdateParentescosMenoreDto) {

    try{
      const respuesta = await this.parentescoMenorRepository.update(id, data);
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
