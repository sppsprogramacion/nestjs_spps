import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJuzgadoDto } from './dto/create-juzgado.dto';
import { UpdateJuzgadoDto } from './dto/update-juzgado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Juzgado } from './entities/juzgado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JuzgadosService {
  
  constructor(
      @InjectRepository(Juzgado)
      private readonly juzgadoRepository: Repository<Juzgado>
    ){}
  
    async create(data: CreateJuzgadoDto): Promise<Juzgado> {
  
      try {
        
        await this.juzgadoRepository.insert(data);
        return data;
  
      }catch (error) {
  
        this.handleDBErrors(error);  
      }     
    }
  
    async findAll() {
      return await this.juzgadoRepository.find(
        {
            order:{
                juzgado: "ASC"
            }
        }
      );
    }
  
    //BUSCAR  XID
    async findOne(id: string) {
  
      const respuesta = await this.juzgadoRepository.findOneBy({id_juzgado: id});
      if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
      return respuesta;
    }
    //FIN BUSCAR  XID..................................................................
  
    async update(id: string, data: UpdateJuzgadoDto) {
  
      try{
        const respuesta = await this.juzgadoRepository.update(id, data);
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
