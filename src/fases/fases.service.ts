import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFaseDto } from './dto/create-fase.dto';
import { UpdateFaseDto } from './dto/update-fase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fase } from './entities/fase.entity';

@Injectable()
export class FasesService {
  constructor(
    @InjectRepository(Fase)
    private readonly faseRepository: Repository<Fase>
  ){}

  async create(data: CreateFaseDto): Promise<Fase> {

    try {
      
      const nuevo = await this.faseRepository.create(data);
      return await this.faseRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.faseRepository.find(
      {
        where: {
          activo : true
        },
        order:{
          fase: "ASC"
        }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.faseRepository.findOneBy({id_fase: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateFaseDto) {

    try{
      const respuesta = await this.faseRepository.update(id, data);
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
