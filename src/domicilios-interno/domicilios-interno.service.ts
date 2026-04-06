import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDomiciliosInternoDto } from './dto/create-domicilios-interno.dto';
import { UpdateDomiciliosInternoDto } from './dto/update-domicilios-interno.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DomicilioInterno } from './entities/domicilios-interno.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { IngresosInternoService } from 'src/ingresos-interno/ingresos-interno.service';
import { UpdateAnularDomicilioInternoDto } from './dto/update-anular-domicilio-interno.dto';

@Injectable()
export class DomiciliosInternoService {
  
  constructor(
    @InjectRepository(DomicilioInterno)
    private readonly domicilioInternoRepository: Repository<DomicilioInterno>,
    @Inject(forwardRef(() => IngresosInternoService))
        private readonly ingresoInternoService: IngresosInternoService
  ){}

  async create(data: CreateDomiciliosInternoDto, usuario: Usuario): Promise<DomicilioInterno> {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];     
    data.fecha_carga = fecha_actual;
    data.usuario_id = usuario.id_usuario;
    data.organismo_id = usuario.organismo_id;

    //controlar ingreso del nterno
    const ingresoInterno = await this.ingresoInternoService.findXInterno(data.interno_id); 
    if (!ingresoInterno) throw new NotFoundException("El interno no tiene un ingreso actual en una dependencia.");
    if (ingresoInterno.eliminado) throw new NotFoundException("El ingreso del interno no es válido o no existe.");
    if (ingresoInterno.esta_liberado) throw new NotFoundException("El interno se encuentra liberado en este ingreso.");

    if(ingresoInterno.organismo_alojamiento_id != usuario.organismo_id) 
      throw new NotFoundException("El interno no se encuentra alojado en la unidad del usuario");
    
    this.deshabilitarDomicilios(data.interno_id);

    try {
      
      const nuevo = await this.domicilioInternoRepository.create(data);
      return await this.domicilioInternoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.domicilioInternoRepository.find(
      {
          order:{
              fecha_carga: "DESC"
          }
      }
    );
  }

  //BUSCAR  XINTERNO
  async findXInterno(id_interno: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.domicilioInternoRepository.find(
        {        
          where: {
            interno_id: id_interno,
            is_eliminado: false
          },
          order:{
            id_domicilio_interno: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.domicilioInternoRepository.findOneBy({id_domicilio_interno: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //DESHABILITAR TODOS LOS DOMICILIOS DE UN INTERNO
  async deshabilitarDomicilios(idInternoX: number) {
    
    try{
      const respuesta = await this.domicilioInternoRepository.createQueryBuilder('domicilios_interno')
      .update('domicilios_interno')
      .set({vigente: false})
      .where('interno_id = :id_interno',{id_interno: idInternoX})
      .execute();
    }
    catch (error){
      this.handleDBErrors(error);
    }
  }
  //FIN DESHABILITAR TODOS LOS DOMICILIOS DE UN INTERNO.....................................................

  //ANULAR DOMICLIO
  async anularDomicilio(id: number, data: UpdateAnularDomicilioInternoDto, usuario: Usuario) {
      
    let dataDomicilioActual: CreateDomiciliosInternoDto = new CreateDomiciliosInternoDto;

    try{
      //buscar domicilio antes de modificar
      dataDomicilioActual = await this.findOne(id);

      //controlar ingreso del nterno
      const ingresoInterno = await this.ingresoInternoService.findXInterno(dataDomicilioActual.interno_id); 
      if (!ingresoInterno) throw new NotFoundException("El interno no tiene un ingreso actual en una dependencia.");
      if (ingresoInterno.eliminado) throw new NotFoundException("El ingreso del interno no es válido o no existe.");
      if (ingresoInterno.esta_liberado) throw new NotFoundException("El interno se encuentra liberado en este ingreso.");
  
      if(ingresoInterno.organismo_alojamiento_id != usuario.organismo_id) 
        throw new NotFoundException("El interno no se encuentra alojado en la unidad del usuario");
       
      //verificar si el domicilio esta eliminado
      if(dataDomicilioActual.is_eliminado) 
        throw new NotFoundException("No se puede anular un domicilio eliminado.");
  
      //verificar si el domicilio esta vigente
      if(dataDomicilioActual.vigente) 
        throw new NotFoundException("No se puede anular el domicilio que se encuentra vigente.");
      
      //actualiza la prohibicion para anular
      let fecha_actual: any = new Date().toISOString().split('T')[0];    
      let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS
      dataDomicilioActual.is_eliminado = true;
      dataDomicilioActual.detalle_eliminado = "ELIMINADO: " + data.detalle_eliminado + " - (Usuario: " + usuario. apellido + " " + usuario.nombre + " - " + fecha_actual + " " + hora_actual + ")"; 

      const respuesta = await this.domicilioInternoRepository.update(id, dataDomicilioActual);
            
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN ANULAR DOMICILIO.....................................................


  async update(id: number, data: UpdateDomiciliosInternoDto, usuario: Usuario) {
    //buscar domicilio antes de modificar
    let dataDomicilioActual = await this.findOne(id);

    //controlar ingreso del nterno
    const ingresoInterno = await this.ingresoInternoService.findXInterno(dataDomicilioActual.interno_id); 
    if (!ingresoInterno) throw new NotFoundException("El interno no tiene un ingreso actual en una dependencia.");
    if (ingresoInterno.eliminado) throw new NotFoundException("El ingreso del interno no es válido o no existe.");
    if (ingresoInterno.esta_liberado) throw new NotFoundException("El interno se encuentra liberado en este ingreso.");

    if(ingresoInterno.organismo_alojamiento_id != usuario.organismo_id) 
      throw new NotFoundException("El interno no se encuentra alojado en la unidad del usuario");

    //verificar si el domicilio esta eliminado
    if(dataDomicilioActual.is_eliminado) 
      throw new NotFoundException("No se puede modificar un domicilio eliminado.");

    //verificar si el domicilio esta vigente
    if(!dataDomicilioActual.vigente) 
      throw new NotFoundException("No se puede modificar un domicilio que no se encuentra vigente.");

    try{
      const respuesta = await this.domicilioInternoRepository.update(id, data);
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
