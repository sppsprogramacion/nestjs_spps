import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBitacoraProhibicionesAnticipadaDto } from './dto/create-bitacora-prohibiciones-anticipada.dto';
import { UpdateBitacoraProhibicionesAnticipadaDto } from './dto/update-bitacora-prohibiciones-anticipada.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BitacoraProhibicionAnticipada } from './entities/bitacora-prohibiciones-anticipada.entity';

@Injectable()
export class BitacoraProhibicionesAnticipadasService {
  constructor(
    @InjectRepository(BitacoraProhibicionAnticipada)
    private readonly bitacoraProhibicionAnticipadaRepository: Repository<BitacoraProhibicionAnticipada>
  ){}

  //CREAR
  async create(data: CreateBitacoraProhibicionesAnticipadaDto): Promise<BitacoraProhibicionAnticipada> {
    
    try {
      
      const nuevo = await this.bitacoraProhibicionAnticipadaRepository.create(data);
      return await this.bitacoraProhibicionAnticipadaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }
  //FIN CREAR.....................................................................


  //LISTA TODOS
  async findAll() {
    return await this.bitacoraProhibicionAnticipadaRepository.find(
      {
        order:{
            fecha_cambio: "DESC"
        }
      }
    );
  }
  //FIN LISTA TODOS....................................................................

   
  //LISTA  XPROHIBICION VISTA
  async findListaXProhibicionAnticipada(id_prohibicion_anticipadax: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.bitacoraProhibicionAnticipadaRepository.find(
        {        
          where: {
            prohibicion_anticipada_id: id_prohibicion_anticipadax
          },
          order:{
            id_bitacora_prohibicion_anticipada: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN LISTA  XPROHIBICION VISTA..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.bitacoraProhibicionAnticipadaRepository.findOneBy({id_bitacora_prohibicion_anticipada: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................


  update(id: number, updateBitacoraProhibicionesAnticipadaDto: UpdateBitacoraProhibicionesAnticipadaDto) {
    return `This action updates a #${id} bitacoraProhibicionesAnticipada`;
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
