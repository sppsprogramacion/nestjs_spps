import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMenoresACargoDto } from './dto/create-menores_a_cargo.dto';
import { UpdateMenoresACargoDto } from './dto/update-menores_a_cargo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MenorACargo } from './entities/menores_a_cargo.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateAnularMenorCargoDto } from './dto/update-anular-menor-cargo.dto';
import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
//import moment from 'moment';
import * as moment from 'moment';

@Injectable()
export class MenoresACargoService {
  
  constructor(
    @InjectRepository(MenorACargo)
    private readonly menorACargoRepository: Repository<MenorACargo>,
    @InjectRepository(Ciudadano)
        private readonly ciudadanoRepository: Repository<Ciudadano>,
  ){}

  async create(data: CreateMenoresACargoDto, usuario: Usuario): Promise<MenorACargo> {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    

    data.fecha_carga = fecha_actual;
    data.organismo_id = usuario.organismo_id;
    data.usuario_id = usuario.id_usuario;

    //control que el adulto y menor sean diferentes 
    if(data.ciudadano_menor_id == data.ciudadano_tutor_id ) throw new ConflictException("El ciudadano selecionado como menor es el mismo que el adulto.");
    //fin control que el adulto y menor sean diferentes  

    //control de existencia de vinculo vigente entre Adulto y el menor
    const dataMenorAdulto = await this.menorACargoRepository.findOneBy({  
      ciudadano_tutor_id: data.ciudadano_tutor_id, 
      ciudadano_menor_id: data.ciudadano_menor_id,
      anulado: false
      
    }); 

    if(dataMenorAdulto) throw new ConflictException("El menor ya se encuentran a cargo de este adulto.");
    //fin control de existencia de vinculo vigente entre el Adulto y el menor 
    
    //buscar adulto y menor para controlar
    const ciudadanos = await this.ciudadanoRepository.find(
      {        
        where: [
          {id_ciudadano: data.ciudadano_tutor_id},
          {id_ciudadano: data.ciudadano_menor_id}
        ]
      }
    );   
    
    //controlar adulto
    let objetoEncontrado = ciudadanos.find(obj => obj.id_ciudadano === data.ciudadano_tutor_id);     
    if(objetoEncontrado){
      // if((moment().diff(moment(objetoEncontrado.fecha_nac), 'years') < 18)){
      //   throw new NotFoundException("El ciudadano seleccionado como tutor es menor de edad. (Tiene menos de 18 años)");
      // }

      const fechaNac = new Date(objetoEncontrado.fecha_nac);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNac.getFullYear();
      const m = hoy.getMonth() - fechaNac.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
      }
      if (edad < 18) {
        throw new NotFoundException(
          `El ciudadano seleccionado como tutor es menor de edad. (Tiene ${edad} años)`
        );
      }
    }
    else{
      throw new NotFoundException("El ciudadano seleccionado como tutor no existe.");
    }

    //controlar menor
    objetoEncontrado = null;
    objetoEncontrado = ciudadanos.find(obj => obj.id_ciudadano === data.ciudadano_menor_id);     
    if(objetoEncontrado){
      // if((moment().diff(moment(objetoEncontrado.fecha_nac), 'years') >= 18)){
      //   throw new NotFoundException("El ciudadano seleccionado como menor es adulto. (Tiene 18 años o más)");
      // }
      const fechaNac = new Date(objetoEncontrado.fecha_nac);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNac.getFullYear();
      const m = hoy.getMonth() - fechaNac.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
      }
      if (edad >= 18) {
        throw new NotFoundException(
          `El ciudadano seleccionado como menor es adulto. (Tiene ${edad} años)`
        );
      }

    }
    else{
      throw new NotFoundException("El ciudadano seleccionado como menor no existe.");
    }

    //guardar menor y adulto
    try {
      
      const nuevo = await this.menorACargoRepository.create(data);
      return await this.menorACargoRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }
  //FIN CREAR...................................

  async findAll() {
    return await this.menorACargoRepository.find(
      {
          order:{
              id_menor_a_cargo: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.menorACargoRepository.findOneBy({id_menor_a_cargo: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //BUSCAR LISTA XCIUDADANO TUTOR - SIN ANULAR
  async findXCiudadanoTutor(id_ciudadanox: number) {    
    
      const respuesta = await this.menorACargoRepository.find(
        {        
          where: {
            ciudadano_tutor_id: id_ciudadanox,
            anulado: false
          },
          order:{
            id_menor_a_cargo: "DESC"
          }
        }
      );   

      // Calcular la edad sin moment
      const respuestaConEdad = respuesta.map(item => {
        let edad = null;
    
        if (item.ciudadanoMenor.fecha_nac) {
          const fechaNac = new Date(item.ciudadanoMenor.fecha_nac);
          const hoy = new Date();
          edad = hoy.getFullYear() - fechaNac.getFullYear();
    
          // Ajustar si el cumpleaños no ha pasado este año
          const mes = hoy.getMonth() - fechaNac.getMonth();
          if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
          }
        }
    
        return {
          ...item,
          edad
        };
      });
    
      return respuestaConEdad;

    
  }
  //FIN BUSCAR LISTA XCIUDADANO TUTOR..................................................................

  //BUSCAR LISTA XCIUDADANO MENOR - SIN ANULAR
  async findXCiudadanoMenor(id_ciudadanox: number) {    
    
    const respuesta = await this.menorACargoRepository.find(
      {        
        where: {
          ciudadano_menor_id: id_ciudadanox,
          anulado: false
        },
        order:{
          id_menor_a_cargo: "DESC"
        }
      }
    );   
        
    return respuesta;
  
  }
  //FIN BUSCAR LISTA XCIUDADANO MENOR..................................................................
  
  //BUSCAR LISTA XCIUDADANO TUTOR - ANULADOS Y SIN ANULAR
  async findTodosXCiudadanoTutor(id_ciudadanox: number) {    
    
    const respuesta = await this.menorACargoRepository.find(
      {        
        where: {
          ciudadano_tutor_id: id_ciudadanox
        },
        order:{
          id_menor_a_cargo: "DESC"
        }
      }
    );   
        
    return respuesta;
  
  }
  //FIN BUSCAR LISTA XCIUDADANO TUTOR.......................................................
  
  //BUSCAR LISTA XCIUDADANO MENOR - ANULADOS Y SIN ANULAR
  async findTodosXCiudadanoMenor(id_ciudadanox: number) {    
    
    const respuesta = await this.menorACargoRepository.find(
      {        
        where: {
          ciudadano_menor_id: id_ciudadanox
        },
        order:{
          id_menor_a_cargo: "DESC"
        }
      }
    );   
        
    return respuesta;
  
  }
  //FIN BUSCAR LISTA XCIUDADANO MENOR..................................................................
  


  //QUITAR VIGENTE
  async anular(id_menor_a_cargox: number, data: UpdateAnularMenorCargoDto, usuariox: Usuario) {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 
    
    let detalle: string= data.detalle_anular + " - (Usuario: " + usuariox. apellido + " " + usuariox.nombre + " - " + fecha_actual + " " + hora_actual + ")";
    data.anulado = true;
    data.detalle_anular = detalle;
    
    //controlar si el resgistro ya esta como anulado=true
    const menorACargo = await this.menorACargoRepository.findOneBy({id_menor_a_cargo: id_menor_a_cargox});
    if(menorACargo){
      if(menorACargo.anulado) throw new NotFoundException("No se puede realizar la modificación. Este registro ya se encontraba anulado");
    }
    else{
      throw new NotFoundException("El elemento solicitado no existe.");
    }
  
    //guardar
    try{
      const respuesta = await this.menorACargoRepository.update(id_menor_a_cargox, data);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN QUITAR VIGENTE

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
