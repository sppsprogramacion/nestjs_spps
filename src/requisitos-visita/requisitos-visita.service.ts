import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRequisitoVisitaDto } from './dto/create-requisitos-visita.dto';
import { UpdateRequisitoVisitaDto } from './dto/update-requisitos-visita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RequisitosVisita } from './entities/requisitos-visita.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class RequisitosVisitaService {
    constructor(
      @InjectRepository(RequisitosVisita)
      private readonly requisitosVisitaRepository: Repository<RequisitosVisita>
    ){}
  
    async create(data: CreateRequisitoVisitaDto): Promise<RequisitosVisita> {
  
      try {
        
        const nuevo = await this.requisitosVisitaRepository.create(data);
        return await this.requisitosVisitaRepository.save(nuevo);
      }catch (error) {
  
        this.handleDBErrors(error);  
      }     
    }
  
    async findAll() {
      return await this.requisitosVisitaRepository.find(
        {
            order:{
                id_requisito_entrada: "ASC"
            }
        }
      );
    }
  
    //BUSCAR  XID
    async findOne(id: number) {
  
      const respuesta = await this.requisitosVisitaRepository.findOneBy({id_requisito_entrada: id});
      if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
      return respuesta;
    }
    //FIN BUSCAR  XID..................................................................
  
    async update(id: number, data: UpdateRequisitoVisitaDto, usuario: Usuario) {
  
      try{
        const respuesta = await this.requisitosVisitaRepository.update(id, data);
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
