import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitaInterno } from './entities/visitas-interno.entity';
import { Repository } from 'typeorm';
import { CreateVisitasInternoDto } from './dto/create-visitas-interno.dto';
import { UpdateCambioParentescoDto } from './dto/update-cambio-parentesco.dto';
import { DetalleCambioVisitasInternoDto } from './dto/detalle-cambio-visitas-interno.dto';

@Injectable()
export class VisitasInternosService {

  constructor(
    @InjectRepository(VisitaInterno)
    private readonly visitaInternoRepository: Repository<VisitaInterno>
  ){}

  async create(data: CreateVisitasInternoDto): Promise<VisitaInterno> {

    let fecha_actual: any = new Date().toISOString().split('T')[0];
    data.fecha_alta = fecha_actual;
    data.usuario_id = 2;

    let dataVisitaInterno = await this.findOneXVinculados(data.ciudadano_id, data.interno_id);
    if(dataVisitaInterno) throw new ConflictException("La visita y el interno ya se encuentran vinculados.");

    try {
      
      const nuevo = await this.visitaInternoRepository.create(data);
      return await this.visitaInternoRepository.save(nuevo);

    }catch (error) {
      if(error.code=='ER_DUP_ENTRY'){
      
        let existe = await await this.findOneXVinculados(data.ciudadano_id, data.interno_id);
        if(existe) throw new BadRequestException ("El vinculo entre la visita y el interno ya existe: " + existe.parentesco.parentesco);
      }   

      throw new InternalServerErrorException('Error al crear el vinculo: ' + error.message);
      //this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.visitaInternoRepository.find(
      {
          order:{
              fecha_alta: "DESC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.visitaInternoRepository.findOneBy({id_visita_interno: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //BUSCAR  XVINCULADOS
  async findOneXVinculados(id_ciudadano: number, id_interno: number) {

    const respuesta = await this.visitaInternoRepository.findOneBy({  
        interno_id: id_interno, 
        ciudadano_id: id_ciudadano
        
    });   

    return respuesta;
  }
  //FIN BUSCAR  XVINCULADOS..................................................................

  //BUSCAR  XCIUDADANO
  async findXCiudano(id_ciudanox: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.visitaInternoRepository.find(
        {        
          where: {
            ciudadano_id: id_ciudanox
          },
          order:{
            id_visita_interno: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XCIUDADANO..................................................................

  //BUSCAR  XINTERNO
  async findXInterno(id_internox: number) {    
    //const respuesta = await this.usuariosCentroRepository.findOneBy({id_usuario_centro: id});
    
      const prohibiciiones = await this.visitaInternoRepository.find(
        {        
          where: {
            interno_id: id_internox
          },
          order:{
            id_visita_interno: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR  XINTERNO..................................................................

  //CAMBIO DE PARENTESCO
  async updateCambioParentesco(id: number, data: UpdateCambioParentescoDto) {
    let dataVisitaInterno: CreateVisitasInternoDto = new CreateVisitasInternoDto;
    dataVisitaInterno.parentesco_id = data.parentesco_id;
    
    try{
      const respuesta = await this.visitaInternoRepository.update(id, dataVisitaInterno);
      if((await respuesta).affected == 1){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }
  //FIN CAMBIO DE PARENTESCO....................................

  //ANULAR DE PARENTESCO
  async updateAnularParentesco(id: number, data: DetalleCambioVisitasInternoDto) {
    
    let dataVisitaInterno: CreateVisitasInternoDto = new CreateVisitasInternoDto;
    dataVisitaInterno.anulado = true;

    try{
      const respuesta = await this.visitaInternoRepository.update(id, dataVisitaInterno);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }
  //FIN ANULAR DE PARENTESCO....................................

  async remove(id: number) {
    const respuesta = await this.visitaInternoRepository.findOneBy({id_visita_interno: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de estado_civil que intenta eliminar");
    return await this.visitaInternoRepository.remove(respuesta);
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
