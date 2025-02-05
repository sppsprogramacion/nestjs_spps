import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoriasCiudadanoDto } from './dto/create-categorias-ciudadano.dto';
import { UpdateCategoriasCiudadanoDto } from './dto/update-categorias-ciudadano.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaCiudadano } from './entities/categorias-ciudadano.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasCiudadanoService {
  
  constructor(
    @InjectRepository(CategoriaCiudadano)
    private readonly categoriaCiudadanoRepository: Repository<CategoriaCiudadano>
  ){}

  async create(data: CreateCategoriasCiudadanoDto): Promise<CategoriaCiudadano> {

    try {
      
      const nuevo = await this.categoriaCiudadanoRepository.create(data);
      return await this.categoriaCiudadanoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.categoriaCiudadanoRepository.find(
      {
          order:{
              categoria_ciudadano: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.categoriaCiudadanoRepository.findOneBy({id_categoria_ciudadano: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateCategoriasCiudadanoDto) {

    try{
      const respuesta = await this.categoriaCiudadanoRepository.update(id, data);
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
    const respuesta = await this.categoriaCiudadanoRepository.findOneBy({id_categoria_ciudadano: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de categoria_ciudadano que intenta eliminar");
    return await this.categoriaCiudadanoRepository.remove(respuesta);
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
