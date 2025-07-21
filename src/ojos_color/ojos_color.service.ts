import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOjosColorDto } from './dto/create-ojos_color.dto';
import { UpdateOjosColorDto } from './dto/update-ojos_color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OjosColor } from './entities/ojos_color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OjosColorService {
  constructor(
      @InjectRepository(OjosColor)
      private readonly ojoColorRepository: Repository<OjosColor>
    ){}
  
    async create(data: CreateOjosColorDto): Promise<OjosColor> {
  
      try {
        
        const nuevo = await this.ojoColorRepository.create(data);
        await this.ojoColorRepository.insert(nuevo);
        return nuevo;
        // return await this.ojoColorRepository.save(nuevo);
      }catch (error) {
  
        this.handleDBErrors(error);  
      }     
    }
  
    async findAll() {
      return await this.ojoColorRepository.find(
        {
            order:{
                ojo_color: "ASC"
            }
        }
      );
    }
  
    //BUSCAR  XID
    async findOne(id: string) {
  
      const respuesta = await this.ojoColorRepository.findOneBy({id_ojo_color: id});
      if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
      return respuesta;
    }
    //FIN BUSCAR  XID..................................................................
  
    async update(id: string, data: UpdateOjosColorDto) {
  
      try{
        const respuesta = await this.ojoColorRepository.update(id, data);
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
