import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTiposHistorialPocesalDto } from './dto/create-tipos-historial-pocesal.dto';
import { UpdateTiposHistorialPocesalDto } from './dto/update-tipos-historial-pocesal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoHistorialPocesal } from './entities/tipos-historial-pocesal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposHistorialPocesalService {
  
  constructor(
    @InjectRepository(TipoHistorialPocesal)
    private readonly tipoHistorialPocesalRepository: Repository<TipoHistorialPocesal>
  ){}

  async create(data: CreateTiposHistorialPocesalDto): Promise<TipoHistorialPocesal> {

    try {
      
      const nuevo = await this.tipoHistorialPocesalRepository.create(data);
      return await this.tipoHistorialPocesalRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.tipoHistorialPocesalRepository.find(
      {
          order:{
              tipo_historial_procesal: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.tipoHistorialPocesalRepository.findOneBy({id_tipo_historial_procesal: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTiposHistorialPocesalDto) {

    try{
      const respuesta = await this.tipoHistorialPocesalRepository.update(id, data);
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
  //FIN MANEJO DE ERRORES.............................................................
  
}
