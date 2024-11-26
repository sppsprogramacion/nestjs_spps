import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBitacoraProhibicionesVisitaDto } from './dto/create-bitacora-prohibiciones-visita.dto';
import { UpdateBitacoraProhibicionesVisitaDto } from './dto/update-bitacora-prohibiciones-visita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BitacoraProhibicionVisita } from './entities/bitacora-prohibiciones-visita.entity';
import { Repository } from 'typeorm';
import { CreateProhibicionesVisitaDto } from 'src/prohibiciones-visita/dto/create-prohibiciones-visita.dto';

@Injectable()
export class BitacoraProhibicionesVisitaService {
  constructor(
    @InjectRepository(BitacoraProhibicionVisita)
    private readonly bitacoraProhibicionVisitaRepository: Repository<BitacoraProhibicionVisita>
  ){}

  async create(data: CreateProhibicionesVisitaDto): Promise<BitacoraProhibicionVisita> {
    console.log("en bitacora");
    console.log(data);
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    let dataBitacora: CreateBitacoraProhibicionesVisitaDto = new CreateBitacoraProhibicionesVisitaDto;
    
    dataBitacora.prohibicion_visita_id = data.id_prohibicion_visita;
    dataBitacora.disposicion = data.disposicion;
    dataBitacora.detalle = data.detalle;
    dataBitacora.fecha_inicio = data.fecha_inicio;
    dataBitacora.fecha_fin = data.fecha_fin;
    dataBitacora.vigente = data.vigente;
    dataBitacora.anulado = data.anulado;
    dataBitacora.motivo = "CREACION PROHIBICION";
    dataBitacora.detalle_motivo = "CREACION PROHIBICION";
    dataBitacora.usuario_id = 2;
    dataBitacora.fecha_cambio = fecha_actual;

    console.log("datos bitacora");
    console.log(dataBitacora);

    try {
      
      const nuevo = await this.bitacoraProhibicionVisitaRepository.create(dataBitacora);
      return await this.bitacoraProhibicionVisitaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.bitacoraProhibicionVisitaRepository.find(
      {
          order:{
              fecha_cambio: "DESC"
          }
      }
    );
  }

  //BUSCAR  XPROHIBICION VISTA
  async findXProhibicionVisita(id_prohibicion_visitax: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.bitacoraProhibicionVisitaRepository.find(
        {        
          where: {
            prohibicion_visita_id: id_prohibicion_visitax
          },
          order:{
            fecha_cambio: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XPROHIBICION VISTA..................................................................

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
