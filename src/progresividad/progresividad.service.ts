import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProgresividadDto } from './dto/create-progresividad.dto';
import { UpdateProgresividadDto } from './dto/update-progresividad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Progresividad } from './entities/progresividad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProgresividadService {
  constructor(
    @InjectRepository(Progresividad)
    private readonly progresividadRepository: Repository<Progresividad>
  ){}

  async create(data: CreateProgresividadDto): Promise<Progresividad> {

    try {
      
      const nuevo = await this.progresividadRepository.create(data);
      return await this.progresividadRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.progresividadRepository.find(
      {
        where: {
          activo : true
        },
        order:{
            progresividad: "ASC"
        }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.progresividadRepository.findOneBy({id_progresividad: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateProgresividadDto) {

    try{
      const respuesta = await this.progresividadRepository.update(id, data);
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
