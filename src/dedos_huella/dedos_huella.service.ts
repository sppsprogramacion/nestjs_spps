import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDedosHuellaDto } from './dto/create-dedos_huella.dto';
import { UpdateDedosHuellaDto } from './dto/update-dedos_huella.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DedoHuella } from './entities/dedos_huella.entity';
import { Repository } from 'typeorm';
import { UpdateTamanioDto } from 'src/tamanio/dto/update-tamanio.dto';

@Injectable()
export class DedosHuellaService {
  
  constructor(
      @InjectRepository(DedoHuella)
      private readonly dedoHuellaRepository: Repository<DedoHuella>
    ){}
  
    async create(data: CreateDedosHuellaDto): Promise<DedoHuella> {
  
      try {
        
        const nuevo = await this.dedoHuellaRepository.create(data);
        return await this.dedoHuellaRepository.save(nuevo);
      }catch (error) {
  
        this.handleDBErrors(error);  
      }     
    }
  
    async findAll() {
      return await this.dedoHuellaRepository.find(
        {
            order:{
                dedo_huella: "ASC"
            }
        }
      );
    }
  
    //BUSCAR  XID
    async findOne(id: number) {
  
      const respuesta = await this.dedoHuellaRepository.findOneBy({id_dedo_huella: id});
      if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
      return respuesta;
    }
    //FIN BUSCAR  XID..................................................................
  
    async update(id: number, data: UpdateDedosHuellaDto) {
  
      try{
        const respuesta = await this.dedoHuellaRepository.update(id, data);
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
      const respuesta = await this.dedoHuellaRepository.findOneBy({id_dedo_huella: id});
      if(!respuesta) throw new NotFoundException("No existe el registro de nivel_educacion que intenta eliminar");
      return await this.dedoHuellaRepository.remove(respuesta);
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
