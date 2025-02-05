import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCiudadanosCategoriaDto } from './dto/create-ciudadanos-categoria.dto';
import { UpdateCiudadanosCategoriaDto } from './dto/update-ciudadanos-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CiudadanoCategoria } from './entities/ciudadanos-categoria.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class CiudadanosCategoriasService {
  
  constructor(
    @InjectRepository(CiudadanoCategoria)
    private readonly ciudadanoCategoriaRepository: Repository<CiudadanoCategoria>
  ){}

  async create(data: CreateCiudadanosCategoriaDto, usuario: Usuario): Promise<CiudadanoCategoria> {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    

    data.fecha_carga = fecha_actual;
    data.organismo_id = usuario.organismo_id;
    data.usuario_id = usuario.id_usuario;

    try {
      
      const nuevo = await this.ciudadanoCategoriaRepository.create(data);
      return await this.ciudadanoCategoriaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.ciudadanoCategoriaRepository.find(
      {
          order:{
              id_ciudadano_categoria: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.ciudadanoCategoriaRepository.findOneBy({id_ciudadano_categoria: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateCiudadanosCategoriaDto) {

    try{
      const respuesta = await this.ciudadanoCategoriaRepository.update(id, data);
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
    const respuesta = await this.ciudadanoCategoriaRepository.findOneBy({id_ciudadano_categoria: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de ciudadano_categoria que intenta eliminar");
    return await this.ciudadanoCategoriaRepository.remove(respuesta);
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
