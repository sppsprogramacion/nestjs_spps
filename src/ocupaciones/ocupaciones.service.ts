import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOcupacioneDto } from './dto/create-ocupacione.dto';
import { UpdateOcupacioneDto } from './dto/update-ocupacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ocupacion } from './entities/ocupacione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OcupacionesService {
 
  constructor(
    @InjectRepository(Ocupacion)
    private readonly ocupacionRepository: Repository<Ocupacion>
  ){}

  async create(data: CreateOcupacioneDto): Promise<Ocupacion> {

    try {
      
      const nuevo = await this.ocupacionRepository.create(data);
      return await this.ocupacionRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.ocupacionRepository.find(
      {
          order:{
              ocupacion: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.ocupacionRepository.findOneBy({id_ocupacion: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateOcupacioneDto) {

    try{
      const respuesta = await this.ocupacionRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }

  async remove(id: number) {
    const respuesta = await this.ocupacionRepository.findOneBy({id_ocupacion: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de ocupacion que intenta eliminar");
    return await this.ocupacionRepository.remove(respuesta);
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
