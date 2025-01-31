import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSectoresDestinoDto } from './dto/create-sectores_destino.dto';
import { UpdateSectoresDestinoDto } from './dto/update-sectores_destino.dto';
import { SectorDestino } from './entities/sectores_destino.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SectoresDestinoService {
  
  constructor(
    @InjectRepository(SectorDestino)
    private readonly sectoresDestinoRepository: Repository<SectorDestino>
  ){}

  async create(data: CreateSectoresDestinoDto): Promise<SectorDestino> {

    try {
      
      const nuevo = await this.sectoresDestinoRepository.create(data);
      return await this.sectoresDestinoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.sectoresDestinoRepository.find(
      {
          order:{
              sector_destino: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.sectoresDestinoRepository.findOneBy({id_sector_destino: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateSectoresDestinoDto) {

    try{
      const respuesta = await this.sectoresDestinoRepository.update(id, data);
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
    const respuesta = await this.sectoresDestinoRepository.findOneBy({id_sector_destino: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de sector_destino que intenta eliminar");
    return await this.sectoresDestinoRepository.remove(respuesta);
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
