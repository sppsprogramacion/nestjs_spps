import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrganismosUsuarioDto } from './dto/create-organismos-usuario.dto';
import { UpdateOrganismosUsuarioDto } from './dto/update-organismos-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganismoUsuario } from './entities/organismos-usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrganismosUsuarioService {
  constructor(
    @InjectRepository(OrganismoUsuario)
    private readonly organismoUsuarioRepository: Repository<OrganismoUsuario>
  ){}

  async create(data: CreateOrganismosUsuarioDto): Promise<OrganismoUsuario> {

    try {
      
      const nuevo = await this.organismoUsuarioRepository.create(data);
      return await this.organismoUsuarioRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.organismoUsuarioRepository.find(
      {
          order:{
              organismo_usuario: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.organismoUsuarioRepository.findOneBy({id_organismo_usuario: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateOrganismosUsuarioDto) {

    try{
      const respuesta = await this.organismoUsuarioRepository.update(id, data);
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
    const respuesta = await this.organismoUsuarioRepository.findOneBy({id_organismo_usuario: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de estado_civil que intenta eliminar");
    return await this.organismoUsuarioRepository.remove(respuesta);
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
