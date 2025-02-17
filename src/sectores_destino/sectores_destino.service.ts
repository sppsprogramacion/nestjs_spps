import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSectoresDestinoDto } from './dto/create-sectores_destino.dto';
import { UpdateSectoresDestinoDto } from './dto/update-sectores_destino.dto';
import { SectorDestino } from './entities/sectores_destino.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { OrganismosDestinoService } from 'src/organismos_destino/organismos_destino.service';

@Injectable()
export class SectoresDestinoService {
  
  constructor(
    @InjectRepository(SectorDestino)
    private readonly sectoresDestinoRepository: Repository<SectorDestino>,

    private readonly organismosDestinoService: OrganismosDestinoService 
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

  //BUSCAR  XORGANISMO DESTINO
  async findXOrganismo(id_organismox: number, usuario: Usuario) { 
    
    let organismoDestino = await this.organismosDestinoService.findOne(id_organismox);    

    if (!organismoDestino) throw new NotFoundException("El organismo no existe.");

    if(organismoDestino.organismo_depende != usuario.organismo_id) throw new NotFoundException("El organismo no es accesible por este usuario");

    let sectores: any;   

    //cuando el organismo es una unidad carcelaria o alcaidia
    if(organismoDestino.es_unidad_carcelaria){     
      sectores = await this.sectoresDestinoRepository.find(
        {          
          where: [
            { organismo_destino_id: id_organismox },
            { organismo_destino_id: 22 }
          ],
          order:{
            sector_destino: "ASC"
          }
        }
      );  
    }
    
    //cuando el organismo es una unidad carcelaria o alcaidia
    if(!organismoDestino.es_unidad_carcelaria){
      //cuando el organismo NO ES una unidad carcelaria o alcaidia
      sectores = await this.sectoresDestinoRepository.find(
        {          
          where: {
            organismo_destino_id: id_organismox
          },
          order:{
            sector_destino: "ASC"
          }
        }
      ); 
    }
        
    return sectores;
    
  }
  //FIN BUSCAR  XORGANISMO DESTINO..................................................................

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
