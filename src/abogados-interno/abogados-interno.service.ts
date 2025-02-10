import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbogadoInterno } from './entities/abogados-interno.entity';
import { Repository } from 'typeorm';
import { CreateAbogadosInternoDto } from './dto/create-abogados-interno.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateAbogadosInternoDto } from './dto/update-abogados-interno.dto';

@Injectable()
export class AbogadosInternoService {
  
  constructor(
    @InjectRepository(AbogadoInterno)
    private readonly abogadoInternoRepository: Repository<AbogadoInterno>
  ){}

  async create(data: CreateAbogadosInternoDto, usuario: Usuario): Promise<AbogadoInterno> {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    

    data.fecha_carga = fecha_actual;
    data.organismo_id = usuario.organismo_id;
    data.usuario_id = usuario.id_usuario;

    //control de existencia de vinculo vigente entre el abogado y el interno
    const dataAbogadoInterno = await this.abogadoInternoRepository.findOneBy({  
      interno_id: data.interno_id, 
      ciudadano_id: data.ciudadano_id,
      vigente: true
      
    }); 

    if(dataAbogadoInterno) throw new ConflictException("El abogado y el interno ya se encuentran vinculados.");
    //fin control de existencia de vinculo vigente entre el abogado y el interno
    
    try {
      
      const nuevo = await this.abogadoInternoRepository.create(data);
      return await this.abogadoInternoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.abogadoInternoRepository.find(
      {
          order:{
              id_abogado_interno: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.abogadoInternoRepository.findOneBy({id_abogado_interno: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //BUSCAR LISTA XCIUDADANO
  async findXCiudadano(id_ciudadanox: number) {    
    
      const prohibiciiones = await this.abogadoInternoRepository.find(
        {        
          where: {
            ciudadano_id: id_ciudadanox
          },
          order:{
            id_abogado_interno: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR LISTA XCIUDADANO..................................................................

  //BUSCAR LISTA VIGENTES XCIUDADANO
  async findVigentesXCiudadano(id_ciudadanox: number) {    
    
    const prohibiciiones = await this.abogadoInternoRepository.find(
      {        
        where: {
          ciudadano_id: id_ciudadanox,
          vigente: true
        },
        order:{
          id_abogado_interno: "DESC"
        }
      }
    );   
        
    return prohibiciiones;
  
  }
  //FIN BUSCAR LISTA VIGENTES XCIUDADANO..................................................................


  //QUITAR VIGENTE
  async quitarVigente(id_abogado_internox: number, data: UpdateAbogadosInternoDto, usuariox: Usuario) {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 
    
    let detalle: string= data.detalle_quitar_vigente + " - (Usuario: " + usuariox. apellido + " " + usuariox.nombre + " - " + fecha_actual + " " + hora_actual + ")";
    data.vigente = false;
    data.detalle_quitar_vigente = detalle;
    
    //controlar si el resgistro ya esta como vigente=false
    const categoria = await this.abogadoInternoRepository.findOneBy({id_abogado_interno: id_abogado_internox});
    if(categoria){
      if(!categoria.vigente) throw new NotFoundException("No se puede realizar la modificación. Este registro ya se encuentra establecido como no vigente");
    }
    else{
      throw new NotFoundException("El elemento solicitado no existe.");
    }
  
    //guardar
    try{
      const respuesta = await this.abogadoInternoRepository.update(id_abogado_internox, data);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN QUITAR VIGENTE


  async update(id: number, data: UpdateAbogadosInternoDto) {

    try{
      const respuesta = await this.abogadoInternoRepository.update(id, data);
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
    const respuesta = await this.abogadoInternoRepository.findOneBy({id_abogado_interno: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de ciudadano_categoria que intenta eliminar");
    return await this.abogadoInternoRepository.remove(respuesta);
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
