import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBitacoraProhibicionesVisitaDto } from './dto/create-bitacora-prohibiciones-visita.dto';
import { UpdateBitacoraProhibicionesVisitaDto } from './dto/update-bitacora-prohibiciones-visita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BitacoraProhibicionVisita } from './entities/bitacora-prohibiciones-visita.entity';
import { Repository } from 'typeorm';


@Injectable()
export class BitacoraProhibicionesVisitaService {
  constructor(
    @InjectRepository(BitacoraProhibicionVisita)
    private readonly bitacoraProhibicionVisitaRepository: Repository<BitacoraProhibicionVisita>
  ){}

  //CREAR 
  async create(data: CreateBitacoraProhibicionesVisitaDto): Promise<BitacoraProhibicionVisita> {
    
    try {
      
      const nuevo = await this.bitacoraProhibicionVisitaRepository.create(data);
      return await this.bitacoraProhibicionVisitaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }
  //FIN CREAR

  //LISTA TODOS
  async findAll() {
    return await this.bitacoraProhibicionVisitaRepository.find(
      {
          order:{
              fecha_cambio: "DESC"
          }
      }
    );
  }
  //FIN LISTA TODOS

  //BUSCAR LISTA XPROHIBICION VISTA
  async findXProhibicionVisita(id_prohibicion_visitax: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.bitacoraProhibicionVisitaRepository.find(
        {        
          where: {
            prohibicion_visita_id: id_prohibicion_visitax
          },
          order:{
            id_bitacora_prohibicion_visita: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
  }
  //FIN BUSCAR LISTA XPROHIBICION VISTA..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.bitacoraProhibicionVisitaRepository.findOneBy({id_bitacora_prohibicion_visita: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateBitacoraProhibicionesVisitaDto) {

    try{
      const respuesta = await this.bitacoraProhibicionVisitaRepository.update(id, data);
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
