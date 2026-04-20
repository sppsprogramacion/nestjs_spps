import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTrimestreDto } from './dto/create-trimestre.dto';
import { UpdateTrimestreDto } from './dto/update-trimestre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Trimestre } from './entities/trimestre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TrimestresService {
  
  constructor(
    @InjectRepository(Trimestre)
    private readonly trimestreRepository: Repository<Trimestre>
  ){}

  async create(data: CreateTrimestreDto): Promise<Trimestre> {

    try {
      
      const nuevo = await this.trimestreRepository.create(data);
      return await this.trimestreRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.trimestreRepository.find(
      {
        where: {
          activo : true
        },
        order:{
            trimestre: "ASC"
        }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.trimestreRepository.findOneBy({id_trimestre: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTrimestreDto) {

    try{
      const respuesta = await this.trimestreRepository.update(id, data);
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
