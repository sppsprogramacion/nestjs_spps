import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrganismosDestinoDto } from './dto/create-organismos_destino.dto';
import { UpdateOrganismosDestinoDto } from './dto/update-organismos_destino.dto';
import { OrganismoDestino } from './entities/organismos_destino.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganismosDestinoService {
  constructor(
    @InjectRepository(OrganismoDestino)
    private readonly organismoDestinoRepository: Repository<OrganismoDestino>
  ){}

  async create(data: CreateOrganismosDestinoDto): Promise<OrganismoDestino> {

    try {
      
      const nuevo = await this.organismoDestinoRepository.create(data);
      return await this.organismoDestinoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.organismoDestinoRepository.find(
      {
          order:{
              organismo_destino: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.organismoDestinoRepository.findOneBy({id_organismo_destino: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateOrganismosDestinoDto) {

    try{
      const respuesta = await this.organismoDestinoRepository.update(id, data);
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
    const respuesta = await this.organismoDestinoRepository.findOneBy({id_organismo_destino: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de organismo_destino que intenta eliminar");
    return await this.organismoDestinoRepository.remove(respuesta);
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
