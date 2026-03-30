import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDomiciliosInternoDto } from './dto/create-domicilios-interno.dto';
import { UpdateDomiciliosInternoDto } from './dto/update-domicilios-interno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DomicilioInterno } from './entities/domicilios-interno.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DomiciliosInternoService {
  
  constructor(
    @InjectRepository(DomicilioInterno)
    private readonly domicilioInternoRepository: Repository<DomicilioInterno>
  ){}

  async create(data: CreateDomiciliosInternoDto): Promise<DomicilioInterno> {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];     
    data.fecha_carga = fecha_actual;

    try {
      
      const nuevo = await this.domicilioInternoRepository.create(data);
      return await this.domicilioInternoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.domicilioInternoRepository.find(
      {
          order:{
              fecha_carga: "DESC"
          }
      }
    );
  }

  //BUSCAR  XCIUDADANO
  async findXCiudadano(id_interno: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.domicilioInternoRepository.find(
        {        
          where: {
            interno_id: id_interno
          },
          order:{
            id_domicilio_interno: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.domicilioInternoRepository.findOneBy({id_domicilio_interno: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateDomiciliosInternoDto) {

    try{
      const respuesta = await this.domicilioInternoRepository.update(id, data);
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
