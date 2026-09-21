import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEntradasSalidaDto } from './dto/create-entradas-salida.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntradasSalida } from './entities/entradas-salida.entity';
import { DataSource, In, IsNull, Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateEntradaSalidasCancelarDto } from './dto/update-entradas-salidas-cancelar.dto';
import { UpdateEntradaPrincipalEgresoDto } from './dto/update-entrada-principal-egreso.dto';
import { Ciudadano } from '../ciudadanos/entities/ciudadano.entity';
import { Interno } from 'src/internos/entities/interno.entity';
import { VisitaInterno } from 'src/visitas-internos/entities/visitas-interno.entity';
import { MenorACargo } from '../menores_a_cargo/entities/menores_a_cargo.entity';
import { DriveImagenesService } from 'src/drive-imagenes/drive-imagenes.service';
import { EntradaSalidaResponseDto } from './dto/entrada-salida-response.dto';
import { IngresoInterno } from 'src/ingresos-interno/entities/ingresos-interno.entity';
import { Huella } from 'src/huellas/entities/huella.entity';
import { ProhibicionVisita } from 'src/prohibiciones-visita/entities/prohibiciones-visita.entity';
import { EntradaSalidaCorrelativo } from './entities/entradas-salida-correlativos.entity';
import { MenorHabilitadoEntradaDto } from './dto/menor-habilitado-entrada.dto';

@Injectable()
export class EntradasSalidasService {
  constructor(
      @InjectRepository(EntradasSalida)
      private readonly entradaSalidasRepository: Repository<EntradasSalida>,
      private readonly dataSource: DataSource,
      private readonly driveImagenesService: DriveImagenesService,
    ){}
  
    async create(data: CreateEntradasSalidaDto, usuario: Usuario): Promise<EntradaSalidaResponseDto> {
  
      //cargar datos por defecto
      let fecha_actual: any = new Date().toISOString().split('T')[0];    
      let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 
  
      data.fecha_ingreso_principal = fecha_actual;  
      data.hora_ingreso_principal = hora_actual;
      data.cancelado = false;
      data.organismo_id = usuario.organismo_id;
      data.usuario_id = usuario.id_usuario;  

      return await this.dataSource.transaction(async manager => {
          
          const ciudadanoRepository = manager.getRepository(Ciudadano);
          const entradasSalidaRepository = manager.getRepository(EntradasSalida);
          const entradasSalidaCorrelativosRepository = manager.getRepository(EntradaSalidaCorrelativo);
          const ingresoInternoRepository = manager.getRepository(IngresoInterno);
          const internoRepository = manager.getRepository(Interno);
          const menoresACargoRepository = manager.getRepository(MenorACargo);
          const prohibicionVisitaRepository = manager.getRepository(ProhibicionVisita);
          const visitaInternoRepository = manager.getRepository(VisitaInterno);
  
          // -----------------------------------
          // 1 . VALIDAR INTERNO 
          // -----------------------------------
          const interno = await internoRepository.findOne({
              where: {
                  id_interno: data.interno_id
              }
          });
  
          if (!interno) {
              throw new BadRequestException('El interno indicado no existe.');
          }   

          const ingresoInterno = await ingresoInternoRepository.findOne({
              where: {
                  interno_id: data.interno_id,
                  esta_liberado: false
              }
          });
          
          if (!ingresoInterno) {
              throw new BadRequestException('El interno indicado no se encuentra alojado en esta unidad.');
          } 

          if (ingresoInterno.organismo_alojamiento_id != usuario.organismo_id) {
              throw new BadRequestException('El interno indicado no se encuentra alojado en esta unidad.');
          }  

          // -----------------------------------
          // 2 . VALIDAR CIUDADANO
          // -----------------------------------
          const ciudadano = await ciudadanoRepository.findOne({
              where: {
                  id_ciudadano: data.ciudadano_id
              }
          });
  
          if (!ciudadano) {
              throw new BadRequestException('El ciudadano indicado no existe.');
          }

          // controlar la edad  del ciudadano sin moment    
          let edad = 0;
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

          if (edad < 18) {
              throw new NotFoundException('El ciudadano es menor. Debe ingresar con un adulto.');
          }

          // -----------------------------------
          // 3 . VALIDAR VINCULOS 
          // -----------------------------------
          const listaVinculos = await visitaInternoRepository.find({
              where: {
                  interno_id: data.interno_id,
                  vigente: true
              }
          });
  
          //VALIDAR VINCULO ADULTO
          const vinculoAdulto = listaVinculos.find(v => v.ciudadano_id === data.ciudadano_id)
          if (!vinculoAdulto) {
              throw new BadRequestException('El ciudadano no tiene un vinculo vigente con el interno.');
          }


          // -----------------------------------
          // 4 . VALIDAR MENORES A CARGO
          // -----------------------------------
          let listaMenoresACargoValidos2: MenorHabilitadoEntradaDto[] = [];
          let listaMenoresValidosNombres: string = ""; 
          let nombreMenoresNoVinculados: string = "";

          //solo se controla los menores si mando la lista con los ids con datos
          if(data.listaIdsMenores.length > 0){
            //buscar a los menores que tiene a cargo el adulto
            const listaMenoresACargo = await menoresACargoRepository.find({
                where: {
                  ciudadano_tutor_id: ciudadano.id_ciudadano,
                  anulado: false
                }
            }); 

            //cuando el adulto no tiene menores a cargo
            if(listaMenoresACargo.length === 0){
              throw new BadRequestException('El ciudadano no tiene menores a cargo registrados.');
            }

            // Obtener los IDs de la listaMenores
            const idsMenoresACargo = listaMenoresACargo.map(
                registro => registro.ciudadanoMenor.id_ciudadano
            );
  
            // Buscar cuáles IDs enviados NO fueron encontrados
            const listaIdsNoEncontrados = data.listaIdsMenores.filter(
                id => !idsMenoresACargo.includes(id)
            );
            
            //cuando uno o mas de los ids enviados no coinciden con los menores a cargo del adulto
            if (listaIdsNoEncontrados.length > 0) {
                throw new BadRequestException(`No se encontraron los siguientes menores a cargo del adulto: ${listaIdsNoEncontrados.join(', ')}` );
            }

            // Buscar cuáles IDs enviados fueron encontrados
            const listaIdsEncontrados = data.listaIdsMenores.filter(
                id => idsMenoresACargo.includes(id)
            );          
            
            //CONTROLAR EDAD DE LOS MENORES ENCONTRADOS
            let nombreNoMenores: string = "";
            for(const idMenor of listaIdsEncontrados){
              const menorAACargo = listaMenoresACargo.find(registro => registro.ciudadano_menor_id === idMenor)
              let edadMenor: number = 0;
              const fechaNac = new Date(menorAACargo.ciudadanoMenor.fecha_nac);
              const hoy = new Date();
              edadMenor = hoy.getFullYear() - fechaNac.getFullYear();          
              // Ajustar si el cumpleaños no ha pasado este año
              const mes = hoy.getMonth() - fechaNac.getMonth();
              if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                edadMenor--;
              }

              //determinar si es menor o no
              if(edadMenor >=18){
                //crear lista de ciudadnos que NO SON menores
                nombreNoMenores = nombreNoMenores + menorAACargo.ciudadanoMenor.apellido + " " + menorAACargo.ciudadanoMenor.nombre + " (" + edadMenor + " años) // ";
              }
              else{
                
                //VALIDAR VINCULO MENORES 
                const vinculoMenor = listaVinculos.find(vinculo => vinculo.ciudadano_id === menorAACargo.ciudadanoMenor.id_ciudadano)
                
                //determinar si esta vinculado con el interno
                if (!vinculoMenor) {
                  //crear lista de menores que NO estan vinculados con el interno
                  nombreMenoresNoVinculados = nombreMenoresNoVinculados + menorAACargo.ciudadanoMenor.apellido + " " + menorAACargo.ciudadanoMenor.nombre + " // ";
                } 
                else{
                  //crear lista de menores que estan vinculados con el interno para incorporar a la ficha del adulto
                  listaMenoresValidosNombres = listaMenoresValidosNombres + menorAACargo.ciudadanoMenor.apellido + " " + menorAACargo.ciudadanoMenor.nombre  + " (" + edadMenor + " A) - ";
                  
                  //cargar menores habilitados en la lista
                  const menorValido: MenorHabilitadoEntradaDto = {
                    id_menor: menorAACargo.ciudadanoMenor.id_ciudadano,
                    apellido_nombre: menorAACargo.ciudadanoMenor.apellido + " " + menorAACargo.ciudadanoMenor.nombre,
                    edad: edadMenor,
                    id_sexo: menorAACargo.ciudadanoMenor.sexo_id,
                    id_parentesco: vinculoMenor.parentesco_id
                  };

                  listaMenoresACargoValidos2.push(menorValido);
                }
                
              }
            }

            //cuando hay menores enviados que en realidadad NOO SON menores
            if(nombreNoMenores != ""){
              throw new BadRequestException("Estos ciudadanos no son menores: " + nombreNoMenores );
            }

            //cuando hay menores que no estan vinculados con el interno
            if(nombreMenoresNoVinculados != ""){
              throw new BadRequestException("Estos menores no estan vinculados con el interno: " + nombreMenoresNoVinculados );
            }
          }

          // -----------------------------------
          // 5 . VALIDAR PROHIBICION
          // -----------------------------------
          let estaProhibido: boolean = false;
          const listaProhibiciones = await prohibicionVisitaRepository.find({
              where: {
                  ciudadano_id: data.ciudadano_id,
                  vigente: true,
                  anulado: false
              }
          });


          // -----------------------------------
          // 5 . VALIDAR EXCEPCION INGRESO
          // -----------------------------------
          
          // -----------------------------------
          // 5 . VALIDAR CON REQUISITOS DE CANTIDAD DE DIRECTOS E INDIRECTOS
          // -----------------------------------

          // -----------------------------------
          // 5 . VALIDAD INGRESO EN ENTRADA SALIDAS
          // -----------------------------------
          // const entradasSalidas = await entradasSalidaRepository.find({
          //     where: {
          //         ciudadano_id: data.ciudadano_id,
          //         fecha_ingreso_principal: fecha_actual,
          //         cancelado: false,
          //     }
          // });    

          //buscar numero correlativo para el numero de ficha
          let entradasSalidas = await entradasSalidaRepository
              .createQueryBuilder('entrada')
              .where('entrada.organismo_id = :organismoId', {
                  organismoId: usuario.organismo_id
              })
              .andWhere('entrada.ciudadano_id = :ciudadanoId', {
                  ciudadanoId: ciudadano.id_ciudadano
              })
              .andWhere('entrada.fecha_ingreso_principal = :fechaIngresoPrincipal', {
                  fechaIngresoPrincipal: fecha_actual
              })
              .getOne();   
  
          if (entradasSalidas) { 

              throw new BadRequestException('El ciudadano ya posee un ingreso en esta unidad el dia de la fecha con el numero de ficha: ' + entradasSalidas.numero_ficha)
          }
   
  
          // -----------------------------------
          // 6 . GUARDAR INGRESO
          // -----------------------------------

          //GENERAR NUMERO DE FICHA
          //buscar numero correlativo para el numero de ficha
          let correlativo = await entradasSalidaCorrelativosRepository
              .createQueryBuilder('correlativo')
              .setLock('pessimistic_write')
              .where('correlativo.organismo_id = :organismoId', {
                  organismoId: usuario.organismo_id
              })
              .getOne();          
          
          if(!correlativo){
            throw new BadRequestException("No se pudo generar el numero de ficha. No existe un numerador iniciado para esta unidad");
          }
              
          if(correlativo.fecha == fecha_actual){
            correlativo.ultimo_numero += 1;
          }
          else{
            correlativo.fecha = fecha_actual;
            correlativo.ultimo_numero = 1;
          }
        
          //actualiza numero correlativo
          await entradasSalidaCorrelativosRepository.save(correlativo);      
          let numeroAux = correlativo.ultimo_numero;          
          
          //numeroAux = (Number(resultado.maximo) || 0) + 1;
          let numeroFicha = numeroAux.toString().padStart(4, '0');
          numeroFicha = usuario.organismo_id + numeroFicha;

          const nuevoIngreso = entradasSalidaRepository.create({
            numero_ficha: numeroFicha,
            numero_aux: numeroAux,
            interno_id: data.interno_id,
            nombre_interno: interno.apellido + " " + interno.nombre,
            ciudadano_id: data.ciudadano_id,
            nombre_visita: ciudadano.apellido  + " " + ciudadano.nombre, 
            edad: edad,
            sexo_id: ciudadano.sexo_id,
            parentesco_id: vinculoAdulto.parentesco_id,
            categoria: "ADULTO",
            entrada_salida_id_tutor: null,
            menores: listaMenoresValidosNombres,
            fecha_ingreso_principal: fecha_actual,
            hora_ingreso_principal: hora_actual,
            casillero: data.casillero,            
            organismo_id: usuario.organismo_id,
            usuario_id: usuario.id_usuario
          });
  
          const ingresoGuardado = await entradasSalidaRepository.save(nuevoIngreso);    
  
          //INGRESAR MENORES
          if(data.listaIdsMenores.length > 0){
            let listaMenoresAIngresar: EntradasSalida[] = [];
            for (const menor of listaMenoresACargoValidos2) {
              //GENERAR NUMERO DE FICHA
              correlativo.ultimo_numero += 1;
              numeroAux = correlativo.ultimo_numero; 
              numeroFicha = numeroAux.toString().padStart(4, '0');
              numeroFicha = usuario.organismo_id + numeroFicha;
  
              const nuevoIngresoMenor = entradasSalidaRepository.create({
                  numero_ficha: numeroFicha,
                  numero_aux: numeroAux,
                  interno_id: data.interno_id,
                  nombre_interno: interno.apellido + " " + interno.nombre,
                  ciudadano_id: menor.id_menor,
                  nombre_visita: menor.apellido_nombre, 
                  edad: menor.edad,
                  sexo_id: menor.id_sexo,
                  parentesco_id: menor.id_parentesco,
                  categoria: "MENOR",
                  entrada_salida_id_tutor: ingresoGuardado.id_entrada_salida,
                  fecha_ingreso_principal: fecha_actual,
                  hora_ingreso_principal: hora_actual,
                  casillero: data.casillero,            
                  organismo_id: usuario.organismo_id,
                  usuario_id: usuario.id_usuario
              });

              listaMenoresAIngresar.push(nuevoIngresoMenor);
            }

            // Guardar todos los menores
            await entradasSalidaRepository.save(listaMenoresAIngresar);
        
            // Guardar el último número correlativo utilizado
            await entradasSalidaCorrelativosRepository.save(correlativo);

          }         
  
          // -----------------------------------
          // 7 . RESPUESTA
          // -----------------------------------
          return {
              numero_ficha: ingresoGuardado.numero_ficha,
              ciudadano: ingresoGuardado.nombre_visita,
              interno: ingresoGuardado.nombre_interno,
              parentesco: vinculoAdulto.parentesco.parentesco,
              menores: ingresoGuardado.menores,
              casillero: ingresoGuardado.casillero,
              fecha_registro: ingresoGuardado.fecha_ingreso_principal,
              hora_registro: ingresoGuardado.hora_ingreso_principal,
              organismo: usuario.organismo.organismo
          };
          //return ingresoGuardado;
      });
      
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
            const huellasRepository = manager.getRepository(Huella);
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

            // Calcular la edad ciudadano sin moment    
            let edad = 0;
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

            if (edad < 18) {
                throw new NotFoundException('El ciudadano es menor. Debe ingresar con un adulto.');
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
                    anulado: false,                    
                }
            });

            // ----------------------------------
            // BUSCAR HUELLAS
            // ----------------------------------

            const huellas = await huellasRepository.find({
                where: {
                    ciudadano_id: ciudadano.id_ciudadano,
                    activo: true,                    
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
                esta_prohibido: false,
                tiene_discapacidad: ciudadano.tiene_discapacidad,
                discapacidad_detalle: ciudadano.discapacidad_detalle,
                fecha_alta: ciudadano.fecha_alta
              }, 
              huellasCiudadanoResponse: huellas.map(huella => ({
                id_huella_ciudadano: huella.id_huella_ciudadano,
                ciudadano_id: huella.ciudadano_id,
                dedo_id: huella.dedo_id,
                activo: huella.activo,
              })),
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
