import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateConductaDto } from './dto/create-conducta.dto';
import { UpdateConductaDto } from './dto/update-conducta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conducta } from './entities/conducta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConductaService {
  
  constructor(
    @InjectRepository(Conducta)
    private readonly conductaRepository: Repository<Conducta>
  ){}

  async create(data: CreateConductaDto): Promise<Conducta> {

    try {
      
      const nuevo = await this.conductaRepository.create(data);
      return await this.conductaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.conductaRepository.find(
      {
        where: {
          activo : true
        },
        order:{
          conducta: "ASC"
        }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.conductaRepository.findOneBy({id_conducta: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateConductaDto) {

    try{
      const respuesta = await this.conductaRepository.update(id, data);
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
