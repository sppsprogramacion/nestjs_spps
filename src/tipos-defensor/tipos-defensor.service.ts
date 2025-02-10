import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTiposDefensorDto } from './dto/create-tipos-defensor.dto';
import { UpdateTiposDefensorDto } from './dto/update-tipos-defensor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoDefensor } from './entities/tipos-defensor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposDefensorService {
  constructor(
    @InjectRepository(TipoDefensor)
    private readonly tipoDefensorRepository: Repository<TipoDefensor>
  ){}

  async create(data: CreateTiposDefensorDto): Promise<TipoDefensor> {

    try {
      
      const nuevo = await this.tipoDefensorRepository.create(data);
      return await this.tipoDefensorRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.tipoDefensorRepository.find(
      {
          order:{
              tipo_defensor: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.tipoDefensorRepository.findOneBy({id_tipo_defensor: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateTiposDefensorDto) {

    try{
      const respuesta = await this.tipoDefensorRepository.update(id, data);
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
    const respuesta = await this.tipoDefensorRepository.findOneBy({id_tipo_defensor: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de tipo_defensor que intenta eliminar");
    return await this.tipoDefensorRepository.remove(respuesta);
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
