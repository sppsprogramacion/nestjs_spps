import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateHuellaDto } from './dto/create-huella.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

import { Ciudadano } from 'src/ciudadanos/entities/ciudadano.entity';
import { DedoHuella } from 'src/dedos_huella/entities/dedos_huella.entity';
import { Huella } from './entities/huella.entity';
import { HuellaResponseDto } from './dto/huella-response.dto';
import { UpdateHuellaDto } from './dto/update-huella.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { HuellaCambio } from 'src/huellas-cambios/entities/huellas-cambio.entity';

@Injectable()
export class HuellasService {
  
    constructor(
        @InjectRepository(Huella)
        private readonly huellaRepository: Repository<Huella>,
        @InjectRepository(Ciudadano)
        private readonly ciudadanoRepository: Repository<Ciudadano>,
        @InjectRepository(DedoHuella)
        private readonly dedoRepository: Repository<DedoHuella>,
    
        private readonly dataSource: DataSource,
    ){}

//   async create(dto: CreateHuellaDto, usuario: Usuario): Promise<HuellaResponseDto> {
    
//     // -------------------------------------------------
//     // 1. Verificar que exista el ciudadano
//     // -------------------------------------------------

//     const ciudadano =
//         await this.ciudadanoRepository.findOne({
//             where: {
//                 id_ciudadano: dto.ciudadano_id,
//             },
//         });

//     if (!ciudadano) {
//         throw new NotFoundException(
//             `No existe el ciudadano con id ${dto.ciudadano_id}.`,
//         );
//     }


//     // -------------------------------------------------
//     // 2. Verificar que exista el dedo
//     // -------------------------------------------------

//     const dedo =
//         await this.dedoRepository.findOne({
//             where: {
//                 id_dedo_huella: dto.dedo_id,
//             },
//         });

//     if (!dedo) {
//         throw new NotFoundException(
//             `No existe el dedo con id ${dto.dedo_id}.`,
//         );
//     }


//     // -------------------------------------------------
//     // 3. Buscar huellas activas del ciudadano
//     // -------------------------------------------------

//     const huellasActivas =
//         await this.huellaRepository.find({
//             where: {
//                 ciudadano_id: dto.ciudadano_id,
//                 activo: true,
//             },
//         });


//     // -------------------------------------------------
//     // 4. Verificar que no tenga ya 2 huellas activas
//     // -------------------------------------------------

//     if (huellasActivas.length >= 2) {

//         throw new BadRequestException(
//             'El ciudadano ya tiene 2 huellas activas registradas.',
//         );
//     }


//     // -------------------------------------------------
//     // 5. Verificar que el dedo no esté registrado
//     // -------------------------------------------------

//     const huellaMismoDedo =
//         huellasActivas.find(
//             h => h.dedo_id === dto.dedo_id,
//         );

//     if (huellaMismoDedo) {

//         throw new BadRequestException(
//             'El ciudadano ya tiene una huella activa registrada para ese dedo.',
//         );
//     }
//     //fin verificaciones-----

//     // -------------------------------------------------
//     // 6. Convertir Base64 a Buffer
//     // -------------------------------------------------

//     let bufferHuella: Buffer;

//     try {

//         bufferHuella = Buffer.from(dto.huella, 'base64');

//     } catch {

//         throw new BadRequestException(
//             'La huella no contiene un Base64 válido.',
//         );
//     }


//     // -------------------------------------------------
//     // 7. Verificar que el Buffer no esté vacío
//     // -------------------------------------------------

//     if (!bufferHuella || bufferHuella.length === 0) {

//         throw new BadRequestException(
//             'La huella no contiene datos.',
//         );
//     }

//     // -------------------------------------------------
//     // 8. Crear la entidad
//     // -------------------------------------------------

//     try {
//       const nuevaHuella = this.huellaRepository.create({
//           ciudadano_id: dto.ciudadano_id,
//           dedo_id: dto.dedo_id,
//           huella: bufferHuella,
//           activo: true,
//           detalle_motivo: dto.detalle_motivo || 'Registro inicial',
//           organismo_id: usuario.organismo_id,
//           usuario_id: usuario.id_usuario,
//       });
      
//       const huellaGuardada = await this.huellaRepository.save(nuevaHuella);
      
//       return {
//             id_huella_ciudadano: huellaGuardada.id_huella_ciudadano,
//             ciudadano_id: huellaGuardada.ciudadano_id,
//             dedo_id: huellaGuardada.dedo_id,
//             activo: huellaGuardada.activo,
//             detalle_motivo: huellaGuardada.detalle_motivo,
//             fecha_registro: huellaGuardada.fecha_registro,
//             fecha_modificacion: huellaGuardada.fecha_modificacion,
//             organismo_id: huellaGuardada.organismo_id,
//             usuario_id: huellaGuardada.usuario_id,
//         };


//     }catch (error) {

//       this.handleDBErrors(error);  
//     }     
//   }

    async create(dto: CreateHuellaDto,user: Usuario): Promise<HuellaResponseDto> {

        return await this.dataSource.transaction(async manager => {
    
            const huellaRepository = manager.getRepository(Huella);
            const huellaCambioRepository = manager.getRepository(HuellaCambio);
            const ciudadanoRepository = manager.getRepository(Ciudadano);
            const dedoHuellaRepository = manager.getRepository(DedoHuella);
    
            // -----------------------------------
            // VALIDAR CIUDADANO
            // -----------------------------------
            const ciudadano = await ciudadanoRepository.findOne({
                where: {
                    id_ciudadano: dto.ciudadano_id
                }
            });
    
            if (!ciudadano) {
                throw new BadRequestException(
                    'El ciudadano indicado no existe.'
                );
            }
    
    
            // -----------------------------------
            // VALIDAR DEDO
            // -----------------------------------
            const dedo = await dedoHuellaRepository.findOne({
                where: {
                    id_dedo_huella: dto.dedo_id
                }
            });
    
            if (!dedo) {
                throw new BadRequestException(
                    'El dedo indicado no existe.'
                );
            }
    
    
            // -----------------------------------
            // OBTENER HUELLAS ACTIVAS
            // -----------------------------------
            const huellasActivas = await huellaRepository.find({
                where: {
                    ciudadano_id: dto.ciudadano_id,
                    activo: true
                }
            });
    
    
            // Máximo 2 huellas activas
            if (huellasActivas.length >= 2) {
                throw new BadRequestException(
                    'El ciudadano ya posee dos huellas activas.'
                );
            }
    
    
            // No permitir registrar el mismo dedo
            const mismoDedo = huellasActivas.find(
                h => h.dedo_id === dto.dedo_id
            );
    
            if (mismoDedo) {
                throw new BadRequestException(
                    'El ciudadano ya posee una huella activa para ese dedo.'
                );
            }
    
    
            // -----------------------------------
            // BASE64 → BUFFER
            // -----------------------------------
            const bufferHuella = Buffer.from(
                dto.huella,
                'base64'
            );
    
            if (!bufferHuella || bufferHuella.length === 0) {
                throw new BadRequestException(
                    'La huella recibida no es válida.'
                );
            }
    
    
            // -----------------------------------
            // GUARDAR HUELLA
            // -----------------------------------
            const nuevaHuella = huellaRepository.create({
                ciudadano_id: dto.ciudadano_id,
                dedo_id: dto.dedo_id,
                huella: bufferHuella,
    
                activo: true,
    
                detalle_motivo:
                    dto.detalle_motivo || 'Registro inicial',
    
                organismo_id: user.organismo_id,
                usuario_id: user.id_usuario
            });
    
            const huellaGuardada =
                await huellaRepository.save(nuevaHuella);
    
    
            // -----------------------------------
            // REGISTRAR CAMBIO PARA SINCRONIZACION
            // -----------------------------------
            const cambio = huellaCambioRepository.create({
                huella_id:
                    huellaGuardada.id_huella_ciudadano,
    
                accion: 'ALTA',
    
                organismo_id: user.organismo_id,
                usuario_id: user.id_usuario
            });
    
            await huellaCambioRepository.save(cambio);
    
    
            // -----------------------------------
            // RESPUESTA
            // -----------------------------------
            return {
                id_huella_ciudadano:
                    huellaGuardada.id_huella_ciudadano,
    
                ciudadano_id:
                    huellaGuardada.ciudadano_id,
    
                dedo_id:
                    huellaGuardada.dedo_id,
    
                activo:
                    huellaGuardada.activo,
    
                detalle_motivo:
                    huellaGuardada.detalle_motivo,
    
                fecha_registro:
                    huellaGuardada.fecha_registro,
    
                fecha_modificacion:
                    huellaGuardada.fecha_modificacion,
    
                organismo_id:
                    huellaGuardada.organismo_id,
    
                usuario_id:
                    huellaGuardada.usuario_id
            };
        });
    } 
    //FIN CREAR...................................................................
    //.............................................................................


    //RETORNAR TODOS
    async findAll() {
    const huellas = await this.huellaRepository.find({
        where: {
            activo: true,
        },
        order: {
            id_huella_ciudadano: 'ASC',
        },
    });

    return huellas.map(huella => ({
        id_huella_ciudadano:
            huella.id_huella_ciudadano,

        ciudadano_id:
            huella.ciudadano_id,

        dedo_id:
            huella.dedo_id,

        huella:
            huella.huella.toString('base64'),

        activo:
            huella.activo,
    }));
    }
    //FIN RETORNAR TODOS..........................................................................................
    //.............................................................................................................

    //RETORNAR POR CIUDADANO
    async obtenerPorCiudadano( ciudadano_id: number,) {

    const huellas = await this.huellaRepository.find({
        where: {
            ciudadano_id,
            activo: true,
        },
        order: {
            id_huella_ciudadano: 'ASC',
        },
    });

    return huellas.map(huella => ({
        id_huella_ciudadano:
            huella.id_huella_ciudadano,

        ciudadano_id:
            huella.ciudadano_id,

        dedo_id:
            huella.dedo_id,

        huella:
            huella.huella.toString('base64'),

        activo:
            huella.activo,
    }));
    }
    //RETORNAR POR CIUDADANO...................................................................
    //.........................................................................................

    async sincronizacionInicial() {

        return await this.dataSource.transaction('REPEATABLE READ',async manager => {
    
                const cambioRepository =
                    manager.getRepository(HuellaCambio);
    
                const huellaRepository =
                    manager.getRepository(Huella);
    
    
                // ---------------------------------
                // OBTENER VERSION ACTUAL
                // ---------------------------------
    
                const resultadoVersion =
                    await cambioRepository
                        .createQueryBuilder('cambio')
                        .select(
                            'MAX(cambio.version)',
                            'version'
                        )
                        .getRawOne();
    
    
                const versionActual =
                    resultadoVersion?.version || '0';
    
    
                // ---------------------------------
                // OBTENER TODAS LAS HUELLAS ACTIVAS
                // ---------------------------------
    
                const huellas =
                    await huellaRepository.find({
                        where: {
                            activo: true
                        },
                        order: {
                            id_huella_ciudadano: 'ASC'
                        }
                    });
    
    
                // ---------------------------------
                // RESPUESTA
                // ---------------------------------
    
                return {
    
                    version: versionActual,
    
                    huellas: huellas.map(huella => ({
    
                        id_huella_ciudadano:
                            huella.id_huella_ciudadano,
    
                        ciudadano_id:
                            huella.ciudadano_id,
    
                        dedo_id:
                            huella.dedo_id,
    
                        huella:
                            huella.huella.toString('base64')
                    }))
                };
            }
        );
    }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.huellaRepository.findOneBy({id_huella_ciudadano: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateHuellaDto) {

    try{
      // const respuesta = await this.huellaRepository.update(id, data);
      // if((await respuesta).affected == 0){
      //   await this.findOne(id);
      // } 
      // return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }

  async remove(id: number) {
    const respuesta = await this.huellaRepository.findOneBy({id_huella_ciudadano: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de nivel_educacion que intenta eliminar");
    return await this.huellaRepository.remove(respuesta);
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
