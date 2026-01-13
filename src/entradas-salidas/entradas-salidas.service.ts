import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEntradasSalidaDto } from './dto/create-entradas-salida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntradasSalida } from './entities/entradas-salida.entity';
import { IsNull, Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateEntradaSalidasCancelarDto } from './dto/update-entradas-salidas-cancelar.dto';
import { UpdateEntradaPrincipalEgresoDto } from './dto/update-entrada-principal-egreso.dto';

@Injectable()
export class EntradasSalidasService {
  constructor(
      @InjectRepository(EntradasSalida)
      private readonly entradaSalidasRepository: Repository<EntradasSalida>,
      //private readonly sectoresDestinoService: SectoresDestinoService
    ){}
  
    async create(data: CreateEntradasSalidaDto, usuario: Usuario): Promise<EntradasSalida> {
  
      //cargar datos por defecto
      let fecha_actual: any = new Date().toISOString().split('T')[0];    
      let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 
  
      data.fecha_ingreso_principal = fecha_actual;  
      data.hora_ingreso_principal = hora_actual;
      data.cancelado = false;
      data.organismo_id = usuario.organismo_id;
      data.usuario_id = usuario.id_usuario;  
      
      // const sectorDestino = await this.sectoresDestinoService.findOne(data.sector_destino_id);    
  
      // if (!sectorDestino) throw new NotFoundException("El sector no existe.");
  
      // if(sectorDestino.organismo_destino.organismo_depende != usuario.organismo_id && sectorDestino.organismo_destino.id_organismo_destino != 22) 
      //   throw new NotFoundException("El organismo al que pertenece el sector seleccionado no es accesible por este usuario");
        
      try {
        
        const nuevo = await this.entradaSalidasRepository.create(data);
        return await this.entradaSalidasRepository.save(nuevo);
      }catch (error) {
  
        this.handleDBErrors(error);  
      }     
    }
  
    async findAll() {
      return await this.entradaSalidasRepository.find(
        {
            order:{
                id_entrada_salida: "ASC"
            }
        }
      );
    }
  
    //BUSCAR  XCIUDADANO
    async findXCiudadano(id_ciudadanox: number) {    
        const prohibiciiones = await this.entradaSalidasRepository.find(
          {        
            where: {
              ciudadano_id: id_ciudadanox,
              cancelado: false
            },
            order:{
              id_entrada_salida: "DESC"
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
  
      const registros = await this.entradaSalidasRepository.find(
        {        
          where: {
            fecha_ingreso_principal: fecha_actual,
            hora_egreso_principal: IsNull(),
            organismo_id: usuario.organismo_id,
            cancelado: false
          },
          order:{
            id_entrada_salida: "ASC"
          }
        }
      );   
          
      return registros;    
  }
  //FIN BUSCAR  PENDIENTES SALIDA..................................................................
  
  //BUSCAR  XFECHA
  async findXFechaIngreso(fecha_ingresox: string, usuario: Usuario) {    
    
    const f_ingreso: any = new Date(fecha_ingresox).toISOString().split('T')[0];

    const registros = await this.entradaSalidasRepository.find(
      {        
        where: {
          fecha_ingreso_principal: f_ingreso,
          organismo_id: usuario.organismo_id,
          cancelado: false
        },
        order:{
          id_entrada_salida: "ASC"
        }
      }
    );   
        
    return registros;    
  }
  //FIN BUSCAR  XFECHA..................................................................
  
  
  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.entradaSalidasRepository.findOneBy({id_entrada_salida: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................
  
  //CANCELAR
  async cancelarRegistro(id_registro: number, data: UpdateEntradaSalidasCancelarDto, usuariox: Usuario) {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 
    
    let detalle: string= data.detalle_cancelado + " - (Usuario: " + usuariox. apellido + " " + usuariox.nombre + " - " + fecha_actual + " " + hora_actual + ")";
    data.cancelado = true;
    data.detalle_cancelado = detalle;
    
    //controlar si el resgistro ya esta cancelado
    const registro = await this.entradaSalidasRepository.findOneBy({id_entrada_salida: id_registro});
    if(registro){
      if(registro.cancelado) throw new NotFoundException("Este registro ya se encuentra cancelado");
    }
    else{
      throw new NotFoundException("El elemento solicitado no existe.");
    }

    //guardar
    try{
      const respuesta = await this.entradaSalidasRepository.update(id_registro, data);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN CANCELAR
  
  //REGISTRAR EGRESO
  async registrarEgreso(id_registro: number, data: UpdateEntradaPrincipalEgresoDto, usuariox: Usuario) {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 
          
  
    //controlar si el resgistro ya tiene egreso o esta anulado
    const registro = await this.entradaSalidasRepository.findOneBy({id_entrada_salida: id_registro});
    if(registro){
      if(registro.cancelado) throw new NotFoundException("Este registro se encuentra cancelado");
      if(registro.fecha_ingreso_principal != fecha_actual) throw new NotFoundException("El registro al que desea dar egreso no es de la fecha de hoy");
      if(registro.hora_egreso_principal) throw new NotFoundException("Este registro ya tiene hora de egreso");
      if(registro.hora_ingreso_principal > hora_actual) throw new NotFoundException("La hora de egreso no puede ser menor que la hora de ingreso");
    }
    else{
      throw new NotFoundException("El elemento solicitado no existe.");
    }
    
    data.hora_egreso_principal = hora_actual;
    let obs: string= data.observaciones_usuarios + " - Usuario egreso principal: (id: " + usuariox.id_usuario + ") " + usuariox. apellido + " " + usuariox.nombre;
    data.observaciones_usuarios = obs;

    //guardar
    
    try{
      const respuesta = await this.entradaSalidasRepository.update(id_registro, data);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN REGISTRAR EGRESO
  
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
