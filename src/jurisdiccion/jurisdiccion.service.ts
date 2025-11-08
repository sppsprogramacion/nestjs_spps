import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJurisdiccionDto } from './dto/create-jurisdiccion.dto';
import { UpdateJurisdiccionDto } from './dto/update-jurisdiccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Jurisdiccion } from './entities/jurisdiccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JurisdiccionService {
  
  constructor(
      @InjectRepository(Jurisdiccion)
      private readonly jurisdiccionRepository: Repository<Jurisdiccion>
    ){}
  
    async create(data: CreateJurisdiccionDto): Promise<Jurisdiccion> {
  
      try {
        
        await this.jurisdiccionRepository.insert(data);
        return data;

      }catch (error) {
  
        this.handleDBErrors(error);  
      }     
    }
  
    async findAll() {
      return await this.jurisdiccionRepository.find(
        {
            order:{
                jurisdiccion: "ASC"
            }
        }
      );
    }
  
    //BUSCAR  XID
    async findOne(id: string) {
  
      const respuesta = await this.jurisdiccionRepository.findOneBy({id_jurisdiccion: id});
      if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
      return respuesta;
    }
    //FIN BUSCAR  XID..................................................................
  
    async update(id: string, data: UpdateJurisdiccionDto) {
  
      try{
        const respuesta = await this.jurisdiccionRepository.update(id, data);
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
