import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSexoDto } from './dto/create-sexo.dto';
import { UpdateSexoDto } from './dto/update-sexo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sexo } from './entities/sexo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SexoService {
  constructor(
    @InjectRepository(Sexo)
    private readonly sexoRepository: Repository<Sexo>
  ){}

  async create(data: CreateSexoDto): Promise<Sexo> {

    try {
      
      const nuevo = await this.sexoRepository.create(data);
      return await this.sexoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.sexoRepository.find(
      {
          order:{
              sexo: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.sexoRepository.findOneBy({id_sexo: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateSexoDto) {

    try{
      const respuesta = await this.sexoRepository.update(id, data);
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
    const respuesta = await this.sexoRepository.findOneBy({id_sexo: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de sexo que intenta eliminar");
    return await this.sexoRepository.remove(respuesta);
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
