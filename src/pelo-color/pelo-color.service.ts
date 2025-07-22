import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePeloColorDto } from './dto/create-pelo-color.dto';
import { UpdatePeloColorDto } from './dto/update-pelo-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PeloColor } from './entities/pelo-color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PeloColorService {
  constructor(
    @InjectRepository(PeloColor)
    private readonly peloColorRepository: Repository<PeloColor>
  ){}

  async create(data: CreatePeloColorDto): Promise<PeloColor> {

    try {
      
      const nuevo = await this.peloColorRepository.create(data);
      await this.peloColorRepository.insert(nuevo);
      return nuevo;

    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.peloColorRepository.find(
      {
          order:{
              pelo_color: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.peloColorRepository.findOneBy({id_pelo_color: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdatePeloColorDto) {

    try{
      const respuesta = await this.peloColorRepository.update(id, data);
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
