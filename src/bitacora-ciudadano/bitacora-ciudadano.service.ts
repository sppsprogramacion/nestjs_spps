import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBitacoraCiudadanoDto } from './dto/create-bitacora-ciudadano.dto';
import { UpdateBitacoraCiudadanoDto } from './dto/update-bitacora-ciudadano.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BitacoraCiudadano } from './entities/bitacora-ciudadano.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BitacoraCiudadanoService {
  
  constructor(
    @InjectRepository(BitacoraCiudadano)
    private readonly bitacoraCiudadanoRepository: Repository<BitacoraCiudadano>
  ){}

  async create(data: CreateBitacoraCiudadanoDto): Promise<BitacoraCiudadano> {
    
    try {
      
      const nuevo = await this.bitacoraCiudadanoRepository.create(data);
      return await this.bitacoraCiudadanoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.bitacoraCiudadanoRepository.find(
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
    
      const prohibiciiones = await this.bitacoraCiudadanoRepository.find(
        {        
          where: {
            ciudadano_id: id_ciudadanox
          },
          order:{
            id_bitacora_ciudadano: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.bitacoraCiudadanoRepository.findOneBy({id_bitacora_ciudadano: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateBitacoraCiudadanoDto) {

    try{
      const respuesta = await this.bitacoraCiudadanoRepository.update(id, data);
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
