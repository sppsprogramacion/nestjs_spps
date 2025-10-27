import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateZonaResidenciaDto } from './dto/create-zona-residencia.dto';
import { UpdateZonaResidenciaDto } from './dto/update-zona-residencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ZonaResidencia } from './entities/zona-residencia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZonaResidenciaService {
  constructor(
      @InjectRepository(ZonaResidencia)
      private readonly zonaResidenciaRepository: Repository<ZonaResidencia>
    ){}
  
    async create(data: CreateZonaResidenciaDto): Promise<ZonaResidencia> {
  
      try {
        
        const nuevo = await this.zonaResidenciaRepository.create(data);
        await this.zonaResidenciaRepository.insert(nuevo);
        return nuevo;
  
      }catch (error) {
  
        this.handleDBErrors(error);  
      }     
    }
  
    async findAll() {
      return await this.zonaResidenciaRepository.find(
        {
            order:{
                zona_residencia: "ASC"
            }
        }
      );
    }
  
    //BUSCAR  XID
    async findOne(id: string) {
  
      const respuesta = await this.zonaResidenciaRepository.findOneBy({id_zona_residencia: id});
      if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
      return respuesta;
    }
    //FIN BUSCAR  XID..................................................................
  
    async update(id: string, data: UpdateZonaResidenciaDto) {
  
      try{
        const respuesta = await this.zonaResidenciaRepository.update(id, data);
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
