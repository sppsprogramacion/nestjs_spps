import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrganismosExternoDto } from './dto/create-organismos-externo.dto';
import { UpdateOrganismosExternoDto } from './dto/update-organismos-externo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganismoExterno } from './entities/organismos-externo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganismosExternosService {
  
  constructor(
    @InjectRepository(OrganismoExterno)
    private readonly organismoExternoRepository: Repository<OrganismoExterno>
  ){}

  async create(data: CreateOrganismosExternoDto): Promise<OrganismoExterno> {

    try {
      
      const nuevo = await this.organismoExternoRepository.create(data);
      return await this.organismoExternoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.organismoExternoRepository.find(
      {
          order:{
              organismo_externo: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.organismoExternoRepository.findOneBy({id_organismo_externo: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateOrganismosExternoDto) {

    try{
      const respuesta = await this.organismoExternoRepository.update(id, data);
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
