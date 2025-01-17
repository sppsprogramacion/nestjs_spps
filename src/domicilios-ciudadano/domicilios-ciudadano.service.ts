import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDomiciliosCiudadanoDto } from './dto/create-domicilios-ciudadano.dto';
import { UpdateDomiciliosCiudadanoDto } from './dto/update-domicilios-ciudadano.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DomicilioCiudadano } from './entities/domicilios-ciudadano.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DomiciliosCiudadanoService {
  
  constructor(
    @InjectRepository(DomicilioCiudadano)
    private readonly domicilioCiudadanoRepository: Repository<DomicilioCiudadano>
  ){}

  async create(data: CreateDomiciliosCiudadanoDto): Promise<DomicilioCiudadano> {
    
    try {
      
      const nuevo = await this.domicilioCiudadanoRepository.create(data);
      return await this.domicilioCiudadanoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.domicilioCiudadanoRepository.find(
      {
          order:{
              fecha_cambio: "DESC"
          }
      }
    );
  }

  //BUSCAR  XCIUDADANO
  async findXCiudadano(id_ciudadanox: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.domicilioCiudadanoRepository.find(
        {        
          where: {
            ciudadano_id: id_ciudadanox
          },
          order:{
            id_domicilio_ciudadano: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.domicilioCiudadanoRepository.findOneBy({id_domicilio_ciudadano: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateDomiciliosCiudadanoDto) {

    try{
      const respuesta = await this.domicilioCiudadanoRepository.update(id, data);
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
