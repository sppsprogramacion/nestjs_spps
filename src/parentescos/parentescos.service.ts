import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateParentescoDto } from './dto/create-parentesco.dto';
import { UpdateParentescoDto } from './dto/update-parentesco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parentesco } from './entities/parentesco.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ParentescosService {
  
  constructor(
    @InjectRepository(Parentesco)
    private readonly parentescoRepository: Repository<Parentesco>
  ){}

  async create(data: CreateParentescoDto): Promise<Parentesco> {

    try {
      
      const nuevo = await this.parentescoRepository.create(data);
      return await this.parentescoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.parentescoRepository.find(
      {
          order:{
              parentesco: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: String) {

    const respuesta = await this.parentescoRepository.findOneBy({id_parentesco: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: string, data: UpdateParentescoDto) {

    try{
      const respuesta = await this.parentescoRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }

  async remove(id: String) {
    const respuesta = await this.parentescoRepository.findOneBy({id_parentesco: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de parentesco que intenta eliminar");
    return await this.parentescoRepository.remove(respuesta);
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
