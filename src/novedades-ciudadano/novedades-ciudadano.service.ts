import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateNovedadesCiudadanoDto } from './dto/create-novedades-ciudadano.dto';
import { UpdateNovedadesCiudadanoDto } from './dto/update-novedades-ciudadano.dto';
import { NovedadCiudadano } from './entities/novedades-ciudadano.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NovedadesCiudadanoService {
  
  constructor(
    @InjectRepository(NovedadCiudadano)
    private readonly novedadesCiudadanoRepository: Repository<NovedadCiudadano>
  ){}

  async create(data: CreateNovedadesCiudadanoDto): Promise<NovedadCiudadano> {
    
    try {
      
      const nuevo = await this.novedadesCiudadanoRepository.create(data);
      return await this.novedadesCiudadanoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.novedadesCiudadanoRepository.find(
      {
          order:{
              fecha_novedad: "DESC"
          }
      }
    );
  }

  //BUSCAR  XCIUDADANO
  async findXCiudadano(id_ciudadanox: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.novedadesCiudadanoRepository.find(
        {        
          where: {
            ciudadano_id: id_ciudadanox
          },
          order:{
            id_novedad_ciudadano: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.novedadesCiudadanoRepository.findOneBy({id_novedad_ciudadano: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateNovedadesCiudadanoDto) {

    try{
      const respuesta = await this.novedadesCiudadanoRepository.update(id, data);
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
