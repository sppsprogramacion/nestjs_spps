import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateConceptoDto } from './dto/create-concepto.dto';
import { UpdateConceptoDto } from './dto/update-concepto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Concepto } from './entities/concepto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConceptoService {
  
  constructor(
    @InjectRepository(Concepto)
    private readonly conceptoRepository: Repository<Concepto>
  ){}

  async create(data: CreateConceptoDto): Promise<Concepto> {

    try {
      
      const nuevo = await this.conceptoRepository.create(data);
      return await this.conceptoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.conceptoRepository.find(
      {
        where: {
          activo : true
        },
        order:{
          concepto: "ASC"
        }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.conceptoRepository.findOneBy({id_concepto: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateConceptoDto) {

    try{
      const respuesta = await this.conceptoRepository.update(id, data);
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
