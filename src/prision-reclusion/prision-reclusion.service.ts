import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePrisionReclusionDto } from './dto/create-prision-reclusion.dto';
import { UpdatePrisionReclusionDto } from './dto/update-prision-reclusion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrisionReclusion } from './entities/prision-reclusion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrisionReclusionService {
  constructor(
    @InjectRepository(PrisionReclusion)
    private readonly prisionReclusionoRepository: Repository<PrisionReclusion>
  ){}
  
  async create(data: CreatePrisionReclusionDto): Promise<PrisionReclusion> {

    try {
      
      const nuevo = await this.prisionReclusionoRepository.create(data);
      return await this.prisionReclusionoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.prisionReclusionoRepository.find(
      {
          order:{
              prision_reclusion: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.prisionReclusionoRepository.findOneBy({id_prision_reclusion: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdatePrisionReclusionDto) {

    try{
      const respuesta = await this.prisionReclusionoRepository.update(id, data);
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
