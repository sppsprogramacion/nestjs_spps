import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRegistroDiarioDto } from './dto/create-registro-diario.dto';
import { UpdateRegistroDiarioDto } from './dto/update-registro-diario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroDiario } from './entities/registro-diario.entity';
import { Between, IsNull, Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Console } from 'console';
import { UpdateAnularDto } from './dto/update-anular.dto';

@Injectable()
export class RegistroDiarioService {
  
  constructor(
    @InjectRepository(RegistroDiario)
    private readonly registroDiarioRepository: Repository<RegistroDiario>
  ){}

  async create(data: CreateRegistroDiarioDto, usuario: Usuario): Promise<RegistroDiario> {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 

    data.fecha_ingreso = fecha_actual;  
    data.hora_ingreso = hora_actual;
    data.anulado = false;
    data.organismo_id = usuario.organismo_id;
    data.usuario_id = usuario.id_usuario;  
    
    try {
      
      const nuevo = await this.registroDiarioRepository.create(data);
      return await this.registroDiarioRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.registroDiarioRepository.find(
      {
          order:{
              id_resgistro_diario: "ASC"
          }
      }
    );
  }

  //BUSCAR  XCIUDADANO
  async findXCiudadano(id_ciudadanox: number) {    
      const prohibiciiones = await this.registroDiarioRepository.find(
        {        
          where: {
            ciudadano_id: id_ciudadanox
          },
          order:{
            id_resgistro_diario: "DESC"
          }
        }
      );   
          
      return prohibiciiones;    
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR PENDIENTES SALIDA - fecha de ingreso actual - segun organismo del usuario, los que aun no registran.. 
  //..hora de salida
  async findPendientesSalidaFechaActual(usuario: Usuario) {    

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];   

    const registros = await this.registroDiarioRepository.find(
      {        
        where: {
          fecha_ingreso: fecha_actual,
          hora_egreso: IsNull(),
          organismo_id: usuario.organismo_id
        },
        order:{
          id_resgistro_diario: "DESC"
        }
      }
    );   
        
    return registros;    
}
//FIN BUSCAR  PENDIENTES SALIDA..................................................................

  //BUSCAR  XCIUDADANO
  async findXFechaHoraIngresoEgreso(fecha_ingresox: string, hora_iniciox: string, hora_finx: string, usuario: Usuario) {    
    
    const f_ingreso: any = new Date(fecha_ingresox).toISOString().split('T')[0];
    console.log("fecha ", fecha_ingresox);
    console.log("horai ", hora_iniciox);
    console.log("horaf ", hora_finx);

    const registros = await this.registroDiarioRepository.find(
      {        
        where: {
          fecha_ingreso: f_ingreso,
          hora_ingreso: Between(hora_iniciox, hora_finx),
          organismo_id: usuario.organismo_id
        },
        order:{
          id_resgistro_diario: "DESC"
        }
      }
    );   
        
    return registros;    
}
//FIN BUSCAR  XCIUDADANO..................................................................


  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.registroDiarioRepository.findOneBy({id_resgistro_diario: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //ANULAR
  //accion puede ser true o false
  async anularRegistro(id_registro: number, data: UpdateAnularDto, usuariox: Usuario) {
    
    
    let detalle: string= data.detalle_anulado + " - (Usuario: " + usuariox. apellido + " " + usuariox.nombre + ")";
    data.anulado = true;
    data.detalle_anulado = detalle;
            
    try{
      const respuesta = await this.registroDiarioRepository.update(id_registro, data);
      if((await respuesta).affected == 0){
        await this.findOne(id_registro);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN ANULAR

  async update(id: number, data: UpdateRegistroDiarioDto) {

    try{
      const respuesta = await this.registroDiarioRepository.update(id, data);
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
    const respuesta = await this.registroDiarioRepository.findOneBy({id_resgistro_diario: id});
    if(!respuesta) throw new NotFoundException("No existe el registro que intenta eliminar");
    return await this.registroDiarioRepository.remove(respuesta);
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
