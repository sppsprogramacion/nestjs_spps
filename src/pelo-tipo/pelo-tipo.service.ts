import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePeloTipoDto } from './dto/create-pelo-tipo.dto';
import { UpdatePeloTipoDto } from './dto/update-pelo-tipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PeloTipo } from './entities/pelo-tipo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeloTipoService {
  
  constructor(
    @InjectRepository(PeloTipo)
    private readonly peloTipoRepository: Repository<PeloTipo>
  ){}

  async create(data: CreatePeloTipoDto): Promise<PeloTipo> {

    try {
      
      const nuevo = await this.peloTipoRepository.create(data);
      await this.peloTipoRepository.insert(nuevo);
      return nuevo;

    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.peloTipoRepository.find(
      {
          order:{
              pelo_tipo: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.peloTipoRepository.findOneBy({id_pelo_tipo: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdatePeloTipoDto) {

    try{
      const respuesta = await this.peloTipoRepository.update(id, data);
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
