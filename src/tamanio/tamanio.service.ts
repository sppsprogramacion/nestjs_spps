import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTamanioDto } from './dto/create-tamanio.dto';
import { UpdateTamanioDto } from './dto/update-tamanio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tamanio } from './entities/tamanio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TamanioService {
  
  constructor(
    @InjectRepository(Tamanio)
    private readonly tamanioRepository: Repository<Tamanio>
  ){}

  async create(data: CreateTamanioDto): Promise<Tamanio> {

    try {
      
      const nuevo = await this.tamanioRepository.create(data);
      await this.tamanioRepository.insert(nuevo);
      return nuevo;

    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.tamanioRepository.find(
      {
          order:{
              tamanio: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.tamanioRepository.findOneBy({id_tamanio: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdateTamanioDto) {

    try{
      const respuesta = await this.tamanioRepository.update(id, data);
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
