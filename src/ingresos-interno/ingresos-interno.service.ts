import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateIngresosInternoDto } from './dto/create-ingresos-interno.dto';
import { UpdateIngresosInternoDto } from './dto/update-ingresos-interno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IngresoInterno } from './entities/ingresos-interno.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class IngresosInternoService {
  
  constructor(
    @InjectRepository(IngresoInterno)
    private readonly ingresossInternoRepository: Repository<IngresoInterno>,
    //private readonly bitacoraProhibicionesVisitaService: BitacoraProhibicionesVisitaService
  ){}

  //NUEVO
  async create(data: CreateIngresosInternoDto, usuario: Usuario): Promise<IngresoInterno> {
    
    let fecha_actual: any = new Date().toISOString().split('T')[0];               
    
    //cargar datos por defecto
    data.fecha_carga = fecha_actual;
    data.organismo_alojamiento_id = usuario.organismo_id;
    data.usuario_carga_id = usuario.id_usuario;
    data.organismo_carga_id = usuario.organismo_id;
    
    try {
      
      const nuevo = await this.ingresossInternoRepository.create(data);
      let respuesta = await this.ingresossInternoRepository.save(nuevo);
      
      return respuesta;
    }catch (error) {
      
      this.handleDBErrors(error);  
    }     
  }
  //FIN NUEVO....................................................

  //BUSCAR TODOS
  async findAll() {
    return await this.ingresossInternoRepository.find(
      {
          order:{
              id_ingreso_interno: "DESC"
          }
      }
    );
  }
  //FIN BUSCAR TODOS...........................................

  //BUSCAR  XINTERNO
  async findXInterno(id_internox: number) { 
      const prohibiciiones = await this.ingresossInternoRepository.find(
        {        
          where: {
            interno_id: id_internox,
            eliminado: false,
            esta_liberado: false
          },
          order:{
            id_ingreso_interno: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XINTERNO..................................................................

  //BUSCAR  XORGANISMO
  async findXOrganismo(id_organismox: number) {    
    
      const prohibiciiones = await this.ingresossInternoRepository.find(
        {        
          where: {
            organismo_alojamiento_id: id_organismox
          },
          order:{
            id_ingreso_interno: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
  }
  //FIN BUSCAR  XORGANISMO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.ingresossInternoRepository.findOneBy({id_ingreso_interno: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................


  async update(id: number, data: UpdateIngresosInternoDto, usuario:Usuario) {
    
    
    try{
      //buscar prohibicion antes de modificar
      let dataIngreso = await this.findOne(id);
      
      //verificar si el organismo del ingreso corresponde al organismo del usuario
      if(dataIngreso.organismo_alojamiento_id != usuario.organismo_id) 
        throw new NotFoundException("No tiene acceso a modificar este registro. No coincide el organismo al que pertece el usuario con el organismo de alojamiento.");
      
      //verificar si el ingreso esta vigente, solo se modifican ingresos vigentes
      if(dataIngreso.esta_liberado) 
        throw new NotFoundException("No se puede modificar los datos de ingreso. El interno esta liberado.");

      //verificar si la prohibicion esta vigente, solo se modifican prohibiciones vigentes
      if(!dataIngreso.eliminado) 
        throw new NotFoundException("No se puede modificar un ingreso eliminado");
    

      //actualiza los datos de ingreso
      const respuesta = await this.ingresossInternoRepository.update(id, data);

      
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
