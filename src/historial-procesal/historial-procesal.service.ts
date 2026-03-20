import { BadRequestException, forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateHistorialProcesalDto } from './dto/create-historial-procesal.dto';
import { UpdateHistorialProcesalDto } from './dto/update-historial-procesal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialProcesal } from './entities/historial-procesal.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { IngresosInternoService } from 'src/ingresos-interno/ingresos-interno.service';

@Injectable()
export class HistorialProcesalService {
  constructor(
    @InjectRepository(HistorialProcesal)
    private readonly historialProcesalRepository: Repository<HistorialProcesal>,
    @Inject(forwardRef(() => IngresosInternoService))
      private readonly ingresoInternoService: IngresosInternoService
  ){}

  async create(data: CreateHistorialProcesalDto): Promise<HistorialProcesal> {
    
    try {
      
      const nuevo = await this.historialProcesalRepository.create(data);
      return await this.historialProcesalRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async createDesdeController(dataHistorialDto: CreateHistorialProcesalDto, usuario: Usuario): Promise<HistorialProcesal> {
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    
    //cargar datos por defecto
    dataHistorialDto.organismo_id = usuario.organismo_id;
    dataHistorialDto.usuario_id = usuario.id_usuario;
    dataHistorialDto.fecha_carga = fecha_actual;
    dataHistorialDto.motivo = "HISTORIAL GENERAL";

    //controlar ingreso del nterno
    const ingresoInterno = await this.ingresoInternoService.findOne(dataHistorialDto.ingreso_interno_id); 
    if (!ingresoInterno) throw new NotFoundException("El ingreso del interno no existe.");
    if (ingresoInterno.eliminado) throw new NotFoundException("El ingreso del interno no es válido o no existe.");
    if (ingresoInterno.esta_liberado) throw new NotFoundException("El interno se encuentra liberado en este ingreso.");

    if(ingresoInterno.organismo_alojamiento_id != usuario.organismo_id) 
      throw new NotFoundException("El interno no se encuentra alojado en la unidad del usuario");

    //guardar historial
    try {
      
      const nuevo = await this.historialProcesalRepository.create(dataHistorialDto);
      return await this.historialProcesalRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.historialProcesalRepository.find(
      {
          order:{
              fecha: "ASC"
          }
      }
    );
  }

  //BUSCAR  X INGRESO
  async findXIngreso(idIngreso: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const historial = await this.historialProcesalRepository.find(
        {        
          where: {
            ingreso_interno_id: idIngreso
          },
          order:{
            id_historial_procesal: "ASC"
          }
        }
      );   
          
      return historial;
    
  }
  //FIN BUSCAR X INGRESO..................................................................

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.historialProcesalRepository.findOneBy({id_historial_procesal: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateHistorialProcesalDto) {

    try{
      const respuesta = await this.historialProcesalRepository.update(id, data);
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
