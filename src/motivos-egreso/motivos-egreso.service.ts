import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMotivosEgresoDto } from './dto/create-motivos-egreso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MotivoEgreso } from './entities/motivos-egreso.entity';
import { Repository } from 'typeorm';
import { UpdateMotivosEgresoDto } from './dto/update-motivos-egreso.dto';

@Injectable()
export class MotivosEgresoService {
  constructor(
    @InjectRepository(MotivoEgreso)
    private readonly motivosEgresoRepository: Repository<MotivoEgreso>
  ){}

  async create(data: CreateMotivosEgresoDto): Promise<MotivoEgreso> {

    try {
      
      const nuevo = await this.motivosEgresoRepository.create(data);
      return await this.motivosEgresoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.motivosEgresoRepository.find(
      {
        where: {
          activo : true
        },
        order:{
          motivo_egreso: "ASC"
        }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.motivosEgresoRepository.findOneBy({id_motivo_egreso: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateMotivosEgresoDto  ) {

    try{
      const respuesta = await this.motivosEgresoRepository.update(id, data);
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
