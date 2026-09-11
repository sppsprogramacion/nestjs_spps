import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEntradasSalidaDto } from './dto/create-entradas-salida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntradasSalida } from './entities/entradas-salida.entity';
import { DataSource, IsNull, Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateEntradaSalidasCancelarDto } from './dto/update-entradas-salidas-cancelar.dto';
import { UpdateEntradaPrincipalEgresoDto } from './dto/update-entrada-principal-egreso.dto';
import { Ciudadano } from '../ciudadanos/entities/ciudadano.entity';
import { Interno } from 'src/internos/entities/interno.entity';
import { VisitaInterno } from 'src/visitas-internos/entities/visitas-interno.entity';
import { MenorACargo } from '../menores_a_cargo/entities/menores_a_cargo.entity';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';

@Injectable()
export class EntradasSalidasService {
  constructor(
      @InjectRepository(EntradasSalida)
      private readonly entradaSalidasRepository: Repository<EntradasSalida>,
      //private readonly sectoresDestinoService: SectoresDestinoService
      private readonly dataSource: DataSource,
      private readonly driveImagenesService: DriveImagenesService,
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
  
  //CIUDADANO PARA VISITA
  async findCiudadanoParaVisita(dni: number,user: Usuario) {
    return await this.dataSource.transaction(
        async manager => {

            const ciudadanoRepository = manager.getRepository(Ciudadano);
            const menoresACargoRepository = manager.getRepository(MenorACargo);
            const internosRepository = manager.getRepository(Interno);
            const visitaInternoRepository = manager.getRepository(VisitaInterno);

            // ----------------------------------
            // BUSCAR CIUDADANO
            // ----------------------------------
            const ciudadano = await ciudadanoRepository.findOne({
                where: {
                    dni: dni
                }
            });

            if (!ciudadano) {
                throw new NotFoundException('No hay una persona registrada con este numero de documento.');
            }


            // ----------------------------------
            // BUSCAR INTERNOS VINCULADOS
            // ----------------------------------
            const vinculos = await visitaInternoRepository.find({
                where: {
                    ciudadano_id: ciudadano.id_ciudadano,
                    vigente: true,                    
                }
            });

            // ----------------------------------
            // BUSCAR MENORES
            // ----------------------------------

            const menores = await menoresACargoRepository.find({
                where: {
                    ciudadano_tutor_id: ciudadano.id_ciudadano,
                    anulado: true,                    
                }
            });

            //--------------------------------------------
            //CONSTRUIR RESPUESTA
            //--------------------------------------------

            //buscar foto del ciudadano
            let imgUrl: string = "";
            let foto_nombre = ciudadano.foto;
            
            //obtener url de la imagen en drive y agregado en la respuesta
            const file = await this.driveImagenesService.getFileByName(foto_nombre, "ciudadano");
            if(file){
              imgUrl = await file.webContentLink;
              ciudadano.foto = imgUrl;
            }
            else{
              ciudadano.foto = null;
            }

            // Calcular la edad ciudadano sin moment    
            let edad = null;
            if (ciudadano.fecha_nac) {
              const fechaNac = new Date(ciudadano.fecha_nac);
              const hoy = new Date();
              edad = hoy.getFullYear() - fechaNac.getFullYear();
        
              // Ajustar si el cumpleaños no ha pasado este año
              const mes = hoy.getMonth() - fechaNac.getMonth();
              if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                edad--;
              }
            }

            // lista de menores midificada y con edad
            const menoresResponse = menores.map(item => {
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
                id_ciudadano: item.ciudadanoMenor.id_ciudadano,
                apellido: item.ciudadanoMenor.apellido,
                nombre: item.ciudadanoMenor.nombre,                
                dni: item.ciudadanoMenor.dni,
                sexo: item.ciudadanoMenor.sexo.sexo,
                edad
              };
            });

            //formar respuesta 
            return {
              
              ciudadanoResponse: {
                id_ciudadano: ciudadano.id_ciudadano,
                apellido: ciudadano.apellido,
                nombre: ciudadano.nombre,
                dni: ciudadano.dni,                  
                sexo: ciudadano.sexo.sexo,
                fecha_nacimiento: ciudadano.fecha_nac,
                edad: edad,
                nacionalidad: ciudadano.nacionalidad.nacionalidad,
                pais: ciudadano.pais.pais,
                provincia: ciudadano.provincia.provincia,
                departamento: ciudadano.departamento.departamento,
                municipio: ciudadano.municipio.municipio,
                ciudad: ciudadano.ciudad,
                barrio: ciudadano.barrio,
                direccion: ciudadano.direccion + " " + ciudadano.numero_dom,
                foto: ciudadano.foto,
                tiene_discapacidad: ciudadano.tiene_discapacidad,
                fecha_alta: ciudadano.fecha_alta
              }, 
              internosResponse: vinculos.map(vinculo=>({
                id_interno: vinculo.interno_id,
                apellido_nombre: vinculo.interno.apellido + " " + vinculo.interno.nombre,
                prontuario: vinculo.interno.prontuario,
                parentesco: vinculo.parentesco.parentesco
              })), 
              menoresResponse
            };
        }
    );
}
  //FIN CIUDADANO PARA VISITA
  //-------------------------------------------------------------------------------------

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
