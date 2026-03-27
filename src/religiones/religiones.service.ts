import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReligioneDto } from './dto/create-religione.dto';
import { UpdateReligioneDto } from './dto/update-religione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Religion } from './entities/religione.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReligionesService {
  constructor(
      @InjectRepository(Religion)
      private readonly religionRepository: Repository<Religion>
    ){}
  
    async create(data: CreateReligioneDto): Promise<Religion> {
  
      try {
        
        const nuevo = await this.religionRepository.create(data);
        return await this.religionRepository.save(nuevo);
      }catch (error) {
  
        this.handleDBErrors(error);  
      }     
    }
  
    async findAll() {
      return await this.religionRepository.find(
        {
            order:{
                religion: "ASC"
            }
        }
      );
    }
  
    //BUSCAR  XID
    async findOne(id: number) {
  
      const respuesta = await this.religionRepository.findOneBy({id_religion: id});
      if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
      return respuesta;
    }
    //FIN BUSCAR  XID..................................................................
  
    async update(id: number, data: UpdateReligioneDto) {
  
      try{
        const respuesta = await this.religionRepository.update(id, data);
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
      const respuesta = await this.religionRepository.findOneBy({id_religion: id});
      if(!respuesta) throw new NotFoundException("No existe el registro de religion que intenta eliminar");
      return await this.religionRepository.remove(respuesta);
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
