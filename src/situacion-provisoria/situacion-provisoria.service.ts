import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSituacionProvisoriaDto } from './dto/create-situacion-provisoria.dto';
import { UpdateSituacionProvisoriaDto } from './dto/update-situacion-provisoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SituacionProvisoria } from './entities/situacion-provisoria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SituacionProvisoriaService {
  
  constructor(
    @InjectRepository(SituacionProvisoria)
    private readonly situacionProvisoriaRepository: Repository<SituacionProvisoria>
  ){}

  async create(data: CreateSituacionProvisoriaDto): Promise<SituacionProvisoria> {

    try {
      
      const nuevo = await this.situacionProvisoriaRepository.create(data);
      return await this.situacionProvisoriaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.situacionProvisoriaRepository.find(
      {
          order:{
              situacion_provisoria: "ASC"
          }
      }
    );
  }

  
  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.situacionProvisoriaRepository.findOneBy({id_situacion_provisoria: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateSituacionProvisoriaDto) {

    try{
      const respuesta = await this.situacionProvisoriaRepository.update(id, data);
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
