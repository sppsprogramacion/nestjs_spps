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
import { isNotEmpty } from 'class-validator';
import { use } from 'passport';

@Injectable()
export class EntradasSalidasService {
  constructor(
      @InjectRepository(EntradasSalida)
      private readonly entradaSalidasRepository: Repository<EntradasSalida>,
      private readonly dataSource: DataSource,
      private readonly driveImagenesService: DriveImagenesService,
    ){}
  
    //CREAR ENTRADA
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
          // const interno = await internoRepository.findOne({
          //     where: {
          //         id_interno: data.interno_id
          //     }
          // });
  
          // if (!interno) {
          //     throw new BadRequestException('El interno indicado no existe.');
          // }   

          const ingresoInterno2 = await ingresoInternoRepository.findOne({
              where: {
                  interno_id: data.interno_id,
                  esta_liberado: false
              }
          });

          const ingresoInterno = await ingresoInternoRepository
              .createQueryBuilder('ingreso')     
              .leftJoinAndSelect('ingreso.interno', 'interno')             
              //DATOS DE VINCULOS
              .leftJoinAndSelect(
                  'interno.visitas_internos','vinculo',
                  'vinculo.vigente = :vinculoVigente', { vinculoVigente: true }
              ) 
              .leftJoinAndSelect(
                  'vinculo.parentesco','vinculoParentesco'
              ) 
              .leftJoinAndSelect(
                  'vinculo.ciudadano','ciudadano',
              )   
              //DATOS DE PROHIBICIONES
              .leftJoinAndSelect(
                  'ciudadano.prohibiciones_visita','prohibicion',
                  `
                  prohibicion.anulado = :prohibicionAnulado
                  AND prohibicion.fecha_fin >= :fechaActual
                  AND prohibicion.organismo_id = :idOrganismo
                  `,
                  {
                      prohibicionAnulado: false,
                      fechaActual: fecha_actual,
                      idOrganismo: usuario.organismo_id
                  }
              )        
              //DATOS DE EXCEPCIONES
              .leftJoinAndSelect(
                  'ciudadano.excepciones_visita','excepcion',
                  `
                  excepcion.cumplimentado = :excepcionCumplimentado
                  AND excepcion.es_visita_ordinaria = :excepcionEsOrdinaria
                  AND excepcion.anulado = :excepcionAnulado
                  AND excepcion.fecha_excepcion = :fechaActual
                  AND prohibicion.organismo_id = :idOrganismo
                  `,
                  {
                    excepcionCumplimentado: false,
                    excepcionEsOrdinaria: true,
                    excepcionAnulado: false,
                    fechaActual: fecha_actual,
                    idOrganismo: usuario.organismo_id
                  }
              )    
              .where('ingreso.interno_id = :idInterno', { idInterno: data.interno_id })    
              .andWhere('ingreso.esta_liberado = :estaLiberado', {
                  estaLiberado: false
              })    
              .getOne();

          
          if (!ingresoInterno) {
              throw new BadRequestException('El interno indicado no se encuentra alojado en esta unidad.');
          } 

          if (ingresoInterno.organismo_alojamiento_id != usuario.organismo_id) {
              throw new BadRequestException('El interno indicado no se encuentra alojado en esta unidad.');
          }  
          
          //obtener interno
          const interno = ingresoInterno.interno;


          // -----------------------------------
          // 2 . VALIDAR CIUDADANO
          // -----------------------------------
          // const ciudadano = await ciudadanoRepository.findOne({
          //     where: {
          //         id_ciudadano: data.ciudadano_id
          //     }
          // });

          const ciudadano = await ciudadanoRepository
              .createQueryBuilder('ciudadano')     
              .leftJoinAndSelect('ciudadano.sexo', 'sexo')
              .leftJoinAndSelect('ciudadano.nacionalidad', 'nacionalidad')  
              .leftJoinAndSelect('ciudadano.pais', 'pais') 
              .leftJoinAndSelect('ciudadano.provincia', 'provincia') 
              .leftJoinAndSelect('ciudadano.departamento', 'departamento')  
              .leftJoinAndSelect('ciudadano.municipio', 'municipio') 
              // DATOS DE MENORES A CARGO
              .leftJoinAndSelect(
                  'ciudadano.menores_acargo','menor',
                  'menor.anulado = :menorAnulado', { menorAnulado: false }
              )        
              .leftJoinAndSelect(
                  'menor.ciudadanoMenor','ciudadanoMenor'
              )
              .leftJoinAndSelect(
                  'ciudadanoMenor.sexo','sexoMenor'
              )
              //DATOS DE VINCULOS
              .leftJoinAndSelect(
                  'ciudadano.visitas_internos','vinculo',
                  'vinculo.vigente = :vinculoVigente', { vinculoVigente: true }
              ) 
              .leftJoinAndSelect(
                  'vinculo.interno','interno',
              )   
              .leftJoinAndSelect(
                  'interno.ingresos','internoIngresos',
                  
              )   
              .leftJoinAndSelect(
                  'vinculo.parentesco','vinculoParentesco'
              )     
              //DATOS DE PROHIBICIONES
              .leftJoinAndSelect(
                  'ciudadano.prohibiciones_visita','prohibicion',
                  `
                  prohibicion.anulado = :prohibicionAnulado
                  AND prohibicion.fecha_fin >= :fechaActual
                  AND prohibicion.organismo_id = :idOrganismo
                  `,
                  {
                      prohibicionAnulado: false,
                      fechaActual: fecha_actual,
                      idOrganismo: usuario.organismo_id
                  }
              )        
              //DATOS DE EXCEPCIONES
              .leftJoinAndSelect(
                  'ciudadano.excepciones_visita','excepcion',
                  `
                  excepcion.cumplimentado = :excepcionCumplimentado
                  AND excepcion.es_visita_ordinaria = :excepcionEsOrdinaria
                  AND excepcion.anulado = :excepcionAnulado
                  AND excepcion.fecha_excepcion = :fechaActual
                  AND prohibicion.organismo_id = :idOrganismo
                  `,
                  {
                    excepcionCumplimentado: false,
                    excepcionEsOrdinaria: true,
                    excepcionAnulado: false,
                    fechaActual: fecha_actual,
                    idOrganismo: usuario.organismo_id
                  }
              )     
              //DATOS DE ENTRADAS SALIDAS
              .leftJoinAndSelect(
                  'ciudadano.entradas_salidas','entradasSalidas',
                  `
                  entradasSalidas.cancelado = :entradaSalidaCancelado
                  AND entradasSalidas.fecha_ingreso_principal = :fechaActual
                  AND entradasSalidas.organismo_id = :idOrganismo
                  `,
                  {
                      entradaSalidaCancelado: false,
                      fechaActual: fecha_actual,
                      idOrganismo: usuario.organismo_id
                  }
              )                  
              //DATOS DE HUELLAS
              .leftJoinAndSelect(
                  'ciudadano.huellas','huella',
                  'huella.activo = :huellaActiva', { huellaActiva: true }
              )        
              .where('ciudadano.id_ciudadano = :idCiudadano', { idCiudadano: data.ciudadano_id })        
              .getOne();
            
  
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
         
          const listaVinculos = ingresoInterno.interno.visitas_internos;
  
          //VALIDAR VINCULO ADULTO
          const vinculoAdulto = listaVinculos.find(v => v.ciudadano_id === data.ciudadano_id)
          if (!vinculoAdulto) {
              throw new BadRequestException('El ciudadano no tiene un vinculo vigente con el interno.');
          }
          if (vinculoAdulto.anulado) {
              throw new BadRequestException('El ciudadano no tiene un vinculo vigente con el interno.');
          }
          if (vinculoAdulto.prohibido) {
              throw new BadRequestException('El ciudadano tiene restriccion de visita con este interno.');
          }


          // -----------------------------------
          // 4 . VALIDAR MENORES A CARGO
          // -----------------------------------
          let listaMenoresACargoValidos2: MenorHabilitadoEntradaDto[] = [];
          let listaMenoresValidosNombres: string = ""; 
          
          //solo se controla los menores si mando la lista con los ids con datos
          if(data.listaIdsMenores.length > 0){
            //obtener a los menores que tiene a cargo el adulto              
            const listaMenoresACargo = ciudadano.menores_acargo;

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
            
            //CONTROLAR VALIDEZ DE LOS MENORES ENCONTRADOS
            let nombreNoMenores: string = "";
            let nombreMenoresNoVinculados: string = "";
            let nombreMenoresVinculoRestringido: string = "";
            let nombreMenoresProhibidos: string = "";
            let menorEsValido: boolean = true;

            for(const idMenor of listaIdsEncontrados){
              const vinculoMenor = listaVinculos.find(vinculo => vinculo.ciudadano_id === idMenor)
              
              //VALIDAR VINCULO DE MENORES
              if (!vinculoMenor) {
                  //crear lista de menores que NO estan vinculados con el interno
                  nombreMenoresNoVinculados = nombreMenoresNoVinculados + vinculoMenor.ciudadano.apellido + " " + vinculoMenor.ciudadano.nombre + " // ";
                  menorEsValido = false;
              } 
              else{
                
                //VALIDAR VINCULO MENORES      
                //determinar si el vinculo esta anulado              
                if (vinculoMenor.anulado) {
                  //crear lista de menores que NO estan vinculados con el interno
                  nombreMenoresNoVinculados = nombreMenoresNoVinculados + vinculoMenor.ciudadano.apellido + " " + vinculoMenor.ciudadano.nombre + " // ";
                  menorEsValido = false;
                } 
                if (vinculoMenor.prohibido) {
                  //lista de menores que tienen el vinculo restringido
                  nombreMenoresVinculoRestringido = nombreMenoresVinculoRestringido + vinculoMenor.ciudadano.apellido + " " + vinculoMenor.ciudadano.nombre + " // ";
                  menorEsValido = false;
                } 

                //VALIDAR EDAD
                //obtener edad del menor
                let edadMenor: number = 0;
                const fechaNac = new Date(vinculoMenor.ciudadano.fecha_nac);
                const hoy = new Date();
                edadMenor = hoy.getFullYear() - fechaNac.getFullYear();          
                // Ajustar si el cumpleaños no ha pasado este año
                const mes = hoy.getMonth() - fechaNac.getMonth();
                if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                  edadMenor--;
                }  
                
                if(edadMenor >=18){
                  //crear lista de ciudadnos que NO SON menores
                  nombreNoMenores = nombreNoMenores + vinculoMenor.ciudadano.apellido + " " + vinculoMenor.ciudadano.nombre + " (" + edadMenor + " años) // ";
                  menorEsValido = false;
                }
                
                //VALIDAR PRHOBICION DEL MENOR
                const listaProhibicionesMenor = vinculoMenor.ciudadano.prohibiciones_visita;

                const estaProhibidoMenor = listaProhibicionesMenor.length > 0;                
                //verificar si tiene excepciones de ingreso
                let tieneExcepcionMEnor: boolean = false;
                if(estaProhibidoMenor){
                  const listaExcepcionesVisitaMenor = vinculoMenor.ciudadano.excepciones_visita;
                  tieneExcepcionMEnor = listaExcepcionesVisitaMenor.length > 0;
                  if(!tieneExcepcionMEnor){
                    //lista de menores que tienen el vinculo restringido
                    nombreMenoresProhibidos = nombreMenoresProhibidos + vinculoMenor.ciudadano.apellido + " " + vinculoMenor.ciudadano.nombre + " // ";
                    menorEsValido = false;
                  }
                }

                if(menorEsValido){
                  //crear lista de menores que estan vinculados con el interno para incorporar a la ficha del adulto
                  listaMenoresValidosNombres = listaMenoresValidosNombres + vinculoMenor.ciudadano.apellido + " " + vinculoMenor.ciudadano.nombre  + " (" + edadMenor + " A) - ";
                  
                  //cargar menores habilitados en la lista
                  const menorValido: MenorHabilitadoEntradaDto = {
                    id_menor: vinculoMenor.ciudadano.id_ciudadano,
                    apellido_nombre: vinculoMenor.ciudadano.apellido + " " + vinculoMenor.ciudadano.nombre,
                    edad: edadMenor,
                    id_sexo: vinculoMenor.ciudadano.sexo_id,
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

            //cuando hay menores enviados que estan vinculados pero el vinculo esta restringido
            if(nombreMenoresVinculoRestringido != ""){
              throw new BadRequestException("Estos menores tienen el vinculo restringido con el interno: " + nombreMenoresVinculoRestringido );
            }

            //cuando hay menores que estan prohibidos
            if(nombreMenoresProhibidos != ""){
              throw new BadRequestException("Estos menores estan prohibidos: " + nombreMenoresProhibidos );
            }
          }

          // -----------------------------------
          // 5 . VALIDAR PROHIBICION
          // -----------------------------------
          
          const listaProhibiciones = ciudadano.prohibiciones_visita;
          
          //determina si tiene prohibiciones
          const estaProhibido = listaProhibiciones.length > 0;
          
          // -----------------------------------
          // 6 . VALIDAR EXCEPCION INGRESO
          // -----------------------------------
          //verificar si tiene excepciones de ingreso cuando esta prohibido
          let tieneExcepcion: boolean = false;
          if(estaProhibido){
            const listaExcepcionesVisita = ciudadano.excepciones_visita;
            tieneExcepcion = listaExcepcionesVisita.length > 0;
          }
          
          // -----------------------------------
          // 7 . VALIDAR CON REQUISITOS DE CANTIDAD DE DIRECTOS E INDIRECTOS
          // -----------------------------------

          // -----------------------------------
          // 8 . VALIDAD INGRESO EN ENTRADA SALIDAS
          // -----------------------------------
          
          // let entradasSalidas = await entradasSalidaRepository
          //     .createQueryBuilder('entrada')
          //     .where('entrada.organismo_id = :organismoId', {
          //         organismoId: usuario.organismo_id
          //     })
          //     .andWhere('entrada.ciudadano_id = :ciudadanoId', {
          //         ciudadanoId: ciudadano.id_ciudadano
          //     })
          //     .andWhere('entrada.fecha_ingreso_principal = :fechaIngresoPrincipal', {
          //         fechaIngresoPrincipal: fecha_actual
          //     })
          //     .getOne();   

          let entradasSalidas = ciudadano.entradas_salidas;
          if(entradasSalidas){
            let entrada = entradasSalidas.find(entrada => entrada.organismo_id == usuario.organismo_id && entrada.cancelado == false)
            if (entrada) { 
  
                throw new BadRequestException('El ciudadano ya posee un ingreso en esta unidad el dia de la fecha con el numero de ficha: ' + entrada.numero_ficha)
            }
          }
   
  
          // -----------------------------------
          // 9 . GUARDAR INGRESO
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
                  casillero: data.casillero + " (a cargo de visita: " + ciudadano.apellido  + " " + ciudadano.nombre + " dni: "+ ciudadano.dni + ")",            
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
          // 10 . RESPUESTA
          // -----------------------------------
          return {
              id_entrada_salida: ingresoGuardado.id_entrada_salida,
              numero_ficha: ingresoGuardado.numero_ficha,
              ciudadano: ingresoGuardado.nombre_visita,
              interno: ingresoGuardado.nombre_interno,
              parentesco: vinculoAdulto.parentesco.parentesco,
              menores: ingresoGuardado.menores,
              casillero: ingresoGuardado.casillero,
              fecha_registro: ingresoGuardado.fecha_ingreso_principal,
              hora_registro: ingresoGuardado.hora_ingreso_principal,
              hora_egreso: ingresoGuardado.hora_egreso_principal,
              organismo: usuario.organismo.organismo
          };
          //return ingresoGuardado;
      });
      
    }
    //FIN CREAR ENTRADA
    //-------------------------------------------------------------------------------


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
    //FIN BUSCAR  XCIUDADANO
    //..................................................................
  
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
  
  //BUSCAR  XFECHA INGRESO
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
  //FIN BUSCAR  XFECHA INGRESO
  //..................................................................

  //BUSCAR INGRESOS DEL DIA
   async findIngresosDelDia( usuario: Usuario) {    
    
    const fecha_actual: any = new Date().toISOString().split('T')[0];  
    
    return await this.dataSource.transaction(
        async manager => {

            const entradaSalidaRepository = manager.getRepository(EntradasSalida);
            const huellasRepository = manager.getRepository(Huella);

            // ----------------------------------
            // BUSCAR INGRESO
            // ----------------------------------
            const ingresosGuardados = await entradaSalidaRepository
                .createQueryBuilder('entrada')
                .leftJoinAndSelect('entrada.sexo', 'sexo')
                .leftJoinAndSelect('entrada.parentesco', 'parentesco')
                .leftJoinAndSelect('entrada.organismo', 'organismo')
                .leftJoinAndSelect('entrada.usuario', 'usuario')
            
                .leftJoin('entrada.ciudadano', 'ciudadano')
                .addSelect([
                    'ciudadano.id_ciudadano',
                    'ciudadano.apellido',
                    'ciudadano.nombre',
                    'ciudadano.dni',
                    'ciudadano.fecha_nac',
                    'ciudadano.tiene_discapacidad',
                    'ciudadano.discapacidad_detalle',
                    'ciudadano.fecha_alta',
                    'ciudadano.foto'
                ])  
                .andWhere('entrada.fecha_ingreso_principal = :fecha', {
                    fecha: fecha_actual
                })
                .andWhere('entrada.organismo_id = :id_organismo', {
                    id_organismo: usuario.organismo_id
                })
                .andWhere('entrada.cancelado = :cancelado', {
                    cancelado: false
                })            
                .getMany();

            if (!ingresosGuardados) {
                throw new NotFoundException('No hay una ingreso registrado con este numero de ficha.');
            }
            
            
            //--------------------------------------------
            //CONSTRUIR RESPUESTA
            //--------------------------------------------
            
            // lista de menores midificada y con edad
            const listaIngresosResponse = ingresosGuardados.map(ingresoGuardado => {
              
          
              return {
                
                id_entrada_salida: ingresoGuardado.id_entrada_salida,
                numero_ficha: ingresoGuardado.numero_ficha,
                nombre_visita: ingresoGuardado.nombre_visita,
                dni_visita: ingresoGuardado.ciudadano.dni,                  
                sexo_visita: ingresoGuardado.sexo.sexo,
                fecha_nacimiento_visita: ingresoGuardado.ciudadano.fecha_nac,
                edad_visita: ingresoGuardado.edad,
                foto_visita: ingresoGuardado.ciudadano.foto,
                tiene_discapacidad_visita: ingresoGuardado.ciudadano.tiene_discapacidad,
                discapacidad_detalle: ingresoGuardado.ciudadano.discapacidad_detalle,
                fecha_alta_visita: ingresoGuardado.ciudadano.fecha_alta,
                nombre_interno: ingresoGuardado.nombre_interno,
                parentesco: ingresoGuardado.parentesco.parentesco,
                menores: ingresoGuardado.menores,
                casillero: ingresoGuardado.casillero,
                fecha_registro: ingresoGuardado.fecha_ingreso_principal,
                hora_registro: ingresoGuardado.hora_ingreso_principal,
                hora_egreso: ingresoGuardado.hora_egreso_principal,
                organismo: usuario.organismo.organismo,          
              };
            });

            //formar respuesta 
            return listaIngresosResponse;
        }
    );
       
  }
  //FIN BUSCAR INGRESOS DEL DIA
  //------------------------------------------------------------------------------------

  
  //BUSCAR ENTRADA XNUMERO DE FICHA
  async findCiudadanoIngresoControl(numeroFicha: string, usuario: Usuario) {    
    
    const fecha_actual: any = new Date().toISOString().split('T')[0];  
    
    return await this.dataSource.transaction(
        async manager => {

            const entradaSalidaRepository = manager.getRepository(EntradasSalida);
            const huellasRepository = manager.getRepository(Huella);

            // ----------------------------------
            // BUSCAR INGRESO
            // ----------------------------------
            const ingresoGuardado = await entradaSalidaRepository
                .createQueryBuilder('entrada')
                .leftJoinAndSelect('entrada.sexo', 'sexo')
                .leftJoinAndSelect('entrada.parentesco', 'parentesco')
                .leftJoinAndSelect('entrada.organismo', 'organismo')
                .leftJoinAndSelect('entrada.usuario', 'usuario')            
                .leftJoin('entrada.ciudadano', 'ciudadano')
                .addSelect([
                    'ciudadano.id_ciudadano',
                    'ciudadano.apellido',
                    'ciudadano.nombre',
                    'ciudadano.dni',
                    'ciudadano.fecha_nac',
                    'ciudadano.tiene_discapacidad',
                    'ciudadano.discapacidad_detalle',
                    'ciudadano.fecha_alta',
                    'ciudadano.foto'
                ])
                //DATOS DE HUELLAS
                .leftJoinAndSelect(
                    'ciudadano.huellas','huella',
                    'huella.activo = :huellaActiva', { huellaActiva: true }
                )    
                .where('entrada.numero_ficha = :numeroFicha', {
                    numeroFicha
                })
                .andWhere('entrada.fecha_ingreso_principal = :fecha', {
                    fecha: fecha_actual
                })
                .andWhere('entrada.cancelado = :cancelado', {
                    cancelado: false
                })            
                .getOne();

            if (!ingresoGuardado) {
                throw new NotFoundException('No hay una ingreso registrado con este numero de ficha.');
            }

            
            
            // ----------------------------------
            // BUSCAR MENORES
            // ----------------------------------
            
            const ingresoMenores = await entradaSalidaRepository
                .createQueryBuilder('entrada')
                .leftJoinAndSelect('entrada.sexo', 'sexo')
                .leftJoinAndSelect('entrada.parentesco', 'parentesco')
                .leftJoinAndSelect('entrada.organismo', 'organismo')
                .leftJoinAndSelect('entrada.usuario', 'usuario')
            
                .leftJoin('entrada.ciudadano', 'ciudadano')
                .addSelect([
                    'ciudadano.id_ciudadano',
                    'ciudadano.apellido',
                    'ciudadano.nombre',
                    'ciudadano.dni',
                    'ciudadano.fecha_nac',
                    'ciudadano.foto'
                ])                                
                .where('entrada.entrada_salida_id_tutor = :id_entrada_salita_tutor', {
                    id_entrada_salita_tutor: ingresoGuardado.id_entrada_salida
                })
                .andWhere('entrada.fecha_ingreso_principal = :fecha', {
                    fecha: fecha_actual
                })
                .andWhere('entrada.cancelado = :cancelado', {
                    cancelado: false
                })
                .getMany();

            // ----------------------------------
            // BUSCAR HUELLAS
            // ----------------------------------

            // const huellas = await huellasRepository.find({
            //     where: {
            //         ciudadano_id: ingresoGuardado.ciudadano.id_ciudadano,
            //         activo: true,                    
            //     }
            // });

            const huellas = ingresoGuardado.ciudadano.huellas;

            //--------------------------------------------
            //CONSTRUIR RESPUESTA
            //--------------------------------------------

            //buscar foto del ciudadano
            let imgUrl: string = "";
            let foto_nombre = ingresoGuardado.ciudadano.foto;
            
            //obtener url de la imagen en drive y agregado en la respuesta
            const file = await this.driveImagenesService.getFileByName(foto_nombre, "ciudadano");
            if(file){
              imgUrl = await file.webContentLink;
              ingresoGuardado.ciudadano.foto = imgUrl;
            }
            else{
              ingresoGuardado.ciudadano.foto = null;
            }
           
            // lista de menores midificada y con edad
            const menoresIngresadosResponse = ingresoMenores.map(item => {
              
          
              return {
                id_ciudadano: item.ciudadano_id,
                nombre_menor: item.nombre_visita,
                nombre_interno: item.nombre_interno,                
                dni: item.ciudadano.dni,
                sexo: item.sexo.sexo,
                edad: item.edad
              };
            });

            //formar respuesta 
            return {
              id_entrada_salida: ingresoGuardado.id_entrada_salida,
              numero_ficha: ingresoGuardado.numero_ficha,
              nombre_visita: ingresoGuardado.nombre_visita,
              dni_visita: ingresoGuardado.ciudadano.dni,                  
              sexo_visita: ingresoGuardado.sexo.sexo,
              fecha_nacimiento_visita: ingresoGuardado.ciudadano.fecha_nac,
              edad_visita: ingresoGuardado.edad,
              foto_visita: ingresoGuardado.ciudadano.foto,
              tiene_discapacidad_visita: ingresoGuardado.ciudadano.tiene_discapacidad,
              discapacidad_detalle: ingresoGuardado.ciudadano.discapacidad_detalle,
              fecha_alta_visita: ingresoGuardado.ciudadano.fecha_alta,
              nombre_interno: ingresoGuardado.nombre_interno,
              parentesco: ingresoGuardado.parentesco.parentesco,
              casillero: ingresoGuardado.casillero,
              menores: ingresoGuardado.menores,
              fecha_registro: ingresoGuardado.fecha_ingreso_principal,
              hora_registro: ingresoGuardado.hora_ingreso_principal,
              hora_egreso: ingresoGuardado.hora_egreso_principal,
              organismo: usuario.organismo.organismo,              
              huellasCiudadanoResponse: huellas.map(huella => ({
                id_huella_ciudadano: huella.id_huella_ciudadano,
                ciudadano_id: huella.ciudadano_id,
                dedo_id: huella.dedo_id,
                activo: huella.activo,
              })),
              menoresIngresadosResponse
              
              
            };
        }
    );
       
  }
  //FIN BUSCAR ENTRADA XNUMERO DE FICHA..................................................................
  
  //BUSCAR CIUDADANO PARA VISITA
  async findCiudadanoParaVisita(dni: number,user: Usuario) {
    let fecha_actual: any = new Date().toISOString().split('T')[0];

    return await this.dataSource.transaction(
        async manager => {

            const ciudadanoRepository = manager.getRepository(Ciudadano);
            const menoresACargoRepository = manager.getRepository(MenorACargo);
            const huellasRepository = manager.getRepository(Huella);
            const prohibicionVisitaRepository = manager.getRepository(ProhibicionVisita);
            const visitaInternoRepository = manager.getRepository(VisitaInterno);

            // ----------------------------------
            // BUSCAR CIUDADANO
            // ----------------------------------
                        
            const ciudadano = await ciudadanoRepository
              .createQueryBuilder('ciudadano')     
              .leftJoinAndSelect('ciudadano.sexo', 'sexo')
              .leftJoinAndSelect('ciudadano.nacionalidad', 'nacionalidad')  
              .leftJoinAndSelect('ciudadano.pais', 'pais') 
              .leftJoinAndSelect('ciudadano.provincia', 'provincia') 
              .leftJoinAndSelect('ciudadano.departamento', 'departamento')  
              .leftJoinAndSelect('ciudadano.municipio', 'municipio') 
              // DATOS DEL CIUDADANO MENOR
              .leftJoinAndSelect(
                  'ciudadano.menores_acargo','menor',
                  'menor.anulado = :menorAnulado', { menorAnulado: false }
              )        
              .leftJoinAndSelect(
                  'menor.ciudadanoMenor','ciudadanoMenor'
              )
              .leftJoinAndSelect(
                  'ciudadanoMenor.sexo','sexoMenor'
              )
              //DATOS DE VINCULOS
              .leftJoinAndSelect(
                  'ciudadano.visitas_internos','vinculo',
                  'vinculo.vigente = :vinculoVigente', { vinculoVigente: true }
              ) 
              .leftJoinAndSelect(
                  'vinculo.interno','interno',
              )   
              .leftJoinAndSelect(
                  'interno.ingresos','internoIngresos',
                  
              )   
              .leftJoinAndSelect(
                  'vinculo.parentesco','vinculoParentesco'
              )     
              //DATOS DE PROHIBICIONES
              .leftJoinAndSelect(
                  'ciudadano.prohibiciones_visita','prohibicion',
                  `
                  prohibicion.anulado = :prohibicionAnulado
                  AND prohibicion.fecha_fin >= :fechaActual
                  AND prohibicion.organismo_id = :idOrganismo
                  `,
                  {
                      prohibicionAnulado: false,
                      fechaActual: fecha_actual,
                      idOrganismo: user.organismo_id
                  }
              )        
              //DATOS DE EXCEPCIONES
              .leftJoinAndSelect(
                  'ciudadano.excepciones_visita','excepcion',
                  `
                  excepcion.cumplimentado = :excepcionCumplimentado
                  AND excepcion.es_visita_ordinaria = :excepcionEsOrdinaria
                  AND excepcion.anulado = :excepcionAnulado
                  AND excepcion.fecha_excepcion = :fechaActual
                  AND prohibicion.organismo_id = :idOrganismo
                  `,
                  {
                    excepcionCumplimentado: false,
                    excepcionEsOrdinaria: true,
                    excepcionAnulado: false,
                    fechaActual: fecha_actual,
                    idOrganismo: user.organismo_id
                  }
              )       
              //DATOS DE HUELLAS
              .leftJoinAndSelect(
                  'ciudadano.huellas','huella',
                  'huella.activo = :huellaActiva', { huellaActiva: true }
              )        
              .where('ciudadano.dni = :dni', { dni })        
              .getOne();


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

            // -----------------------------------
            //VALIDAR PROHIBICION
            // -----------------------------------            
            const listaProhibiciones = ciudadano.prohibiciones_visita;
            //determina si tiene prohibiciones
            const estaProhibido = listaProhibiciones.length > 0;
            
            //verificar si tiene excepciones de ingreso cuando esta prohibido
            let tieneExcepcion: boolean = false;
            if(estaProhibido){
              const listaExcepcionesVisita = ciudadano.excepciones_visita;
              tieneExcepcion = listaExcepcionesVisita.length > 0;
            }

            // ----------------------------------
            // BUSCAR INTERNOS VINCULADOS
            // ----------------------------------            
            const vinculos = ciudadano.visitas_internos;

            //obtener vinculos con interns que esten alojados en la unidad del usuario
            let listaVinculosValidos: VisitaInterno[] = [];
            for(const vinculo of vinculos){
                const ingresoInterno = vinculo.interno.ingresos.find(ingreso => ingreso.eliminado === false && ingreso.esta_liberado === false);
                if(ingresoInterno){
                  if(ingresoInterno.organismo_alojamiento_id === user.organismo_id){
                    listaVinculosValidos.push(vinculo);
                  }
                }
            }

            // ----------------------------------
            // BUSCAR MENORES
            // ----------------------------------           
            const menores = ciudadano.menores_acargo;


            // ----------------------------------
            // BUSCAR HUELLAS
            // ----------------------------------
            const huellas = ciudadano.huellas;

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
            const listaMenoresConEdad = menores.map(item => {
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
                esta_prohibido: estaProhibido,
                tiene_excepcion_ingreso: tieneExcepcion,
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
              internosResponse: listaVinculosValidos.map(vinculo=>({
                id_interno: vinculo.interno_id,
                apellido_nombre: vinculo.interno.apellido + " " + vinculo.interno.nombre,
                prontuario: vinculo.interno.prontuario,
                parentesco: vinculo.parentesco.parentesco
              })), 
              menoresResponse: listaMenoresConEdad.filter(menor => menor.edad < 18)
            };
        }
    );
  }
  //FIN BUSCAR CIUDADANO PARA VISITA
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
      if(registro.categoria != "ADULTO") throw new NotFoundException("El ciudadano que egresa debe ser Adulto");
      if(registro.fecha_ingreso_principal != fecha_actual) throw new NotFoundException("El registro al que desea dar egreso no es de la fecha de hoy");
      if(registro.hora_egreso_principal) throw new NotFoundException("Este registro ya tiene hora de egreso");
      if(registro.hora_ingreso_principal > hora_actual) throw new NotFoundException("La hora de egreso no puede ser menor que la hora de ingreso");
    }
    else{
      throw new NotFoundException("El elemento solicitado no existe.");
    }
    
    data.hora_egreso_principal = hora_actual;

    let obserbaciones_enviadas: string = data.observaciones_usuarios?.trim()
            ? data.observaciones_usuarios.trim() 
            : 'S/N';
    
    let obs: string = "Egreso principal: Usuario: (id: " + usuariox.id_usuario + ") " + usuariox. apellido + " " + usuariox.nombre + ". Obs: " + obserbaciones_enviadas;
    if( isNotEmpty(registro.observaciones_usuarios) ){

      data.observaciones_usuarios = obs + " // " + registro.observaciones_usuarios;
    }
    else{
      data.observaciones_usuarios = obs;
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
