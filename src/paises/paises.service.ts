import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePaiseDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pais } from './entities/pais.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaisesService {
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>
  ){}

  async create(data: CreatePaiseDto): Promise<Pais> {

    try {
      
      const nuevo = await this.paisRepository.create(data);
      return await this.paisRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.paisRepository.find(
      {
          order:{
              pais: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: string) {

    const respuesta = await this.paisRepository.findOneBy({id_pais: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdatePaiseDto) {

    try{
      const respuesta = await this.paisRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }

  async remove(id: string) {
    const respuesta = await this.paisRepository.findOneBy({id_pais: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de pais que intenta eliminar");
    return await this.paisRepository.remove(respuesta);
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
