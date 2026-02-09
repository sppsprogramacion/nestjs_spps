import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTipoDelitoDto } from './dto/create-tipo-delito.dto';
import { UpdateTipoDelitoDto } from './dto/update-tipo-delito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDelito } from './entities/tipo-delito.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoDelitoService {

  constructor(
    @InjectRepository(TipoDelito)
    private readonly tipoDelitoRepository: Repository<TipoDelito>
  ){}

  async create(data: CreateTipoDelitoDto): Promise<TipoDelito> {
  
    try {
      
      const nuevo = await this.tipoDelitoRepository.create(data);
      return await this.tipoDelitoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.tipoDelitoRepository.find(
      {
          order:{
              tipo_delito: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.tipoDelitoRepository.findOneBy({id_tipo_delito: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTipoDelitoDto) {

    try{
      const respuesta = await this.tipoDelitoRepository.update(id, data);
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
