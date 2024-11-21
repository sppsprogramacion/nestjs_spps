import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrganismoDto } from './dto/create-organismo.dto';
import { UpdateOrganismoDto } from './dto/update-organismo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organismo } from './entities/organismo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganismosService {
  constructor(
    @InjectRepository(Organismo)
    private readonly organismoRepository: Repository<Organismo>
  ){}

  async create(data: CreateOrganismoDto): Promise<Organismo> {

    try {
      
      const nuevo = await this.organismoRepository.create(data);
      return await this.organismoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.organismoRepository.find(
      {
          order:{
              organismo: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.organismoRepository.findOneBy({id_organismo: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateOrganismoDto) {

    try{
      const respuesta = await this.organismoRepository.update(id, data);
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
    const respuesta = await this.organismoRepository.findOneBy({id_organismo: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de estado_civil que intenta eliminar");
    return await this.organismoRepository.remove(respuesta);
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
