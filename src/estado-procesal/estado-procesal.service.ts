import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEstadoProcesalDto } from './dto/create-estado-procesal.dto';
import { UpdateEstadoProcesalDto } from './dto/update-estado-procesal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EstadoProcesal } from './entities/estado-procesal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoProcesalService {
  
  constructor(
    @InjectRepository(EstadoProcesal)
    private readonly estadoProcesalRepository: Repository<EstadoProcesal>
  ){}

  async create(data: CreateEstadoProcesalDto): Promise<EstadoProcesal> {

    try {
      
      const nuevo = await this.estadoProcesalRepository.create(data);
      return await this.estadoProcesalRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.estadoProcesalRepository.find(
      {
          order:{
              estado_procesal: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.estadoProcesalRepository.findOneBy({id_estado_procesal: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateEstadoProcesalDto) {

    try{
      const respuesta = await this.estadoProcesalRepository.update(id, data);
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
