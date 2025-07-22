import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePielDto } from './dto/create-piel.dto';
import { UpdatePielDto } from './dto/update-piel.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Piel } from './entities/piel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PielService {
  constructor(
    @InjectRepository(Piel)
    private readonly pielRepository: Repository<Piel>
  ){}

  async create(data: CreatePielDto): Promise<Piel> {

    try {
      
      const nuevo = await this.pielRepository.create(data);
      await this.pielRepository.insert(nuevo);
      return nuevo;

    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.pielRepository.find(
      {
          order:{
            piel: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.pielRepository.findOneBy({id_piel: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdatePielDto) {

    try{
      const respuesta = await this.pielRepository.update(id, data);
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
