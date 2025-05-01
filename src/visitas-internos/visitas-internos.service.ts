import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitaInterno } from './entities/visitas-interno.entity';
import { Repository, In } from 'typeorm';
import { CreateVisitasInternoDto } from './dto/create-visitas-interno.dto';
import { UpdateCambioParentescoDto } from './dto/update-cambio-parentesco.dto';
import { DetalleCambioVisitasInternoDto } from './dto/detalle-cambio-visitas-interno.dto';
import { CreateNovedadesCiudadanoDto } from 'src/novedades-ciudadano/dto/create-novedades-ciudadano.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { NovedadesCiudadanoService } from 'src/novedades-ciudadano/novedades-ciudadano.service';
import { UpdateProhibirParentescoDto } from './dto/update-prohibir-parentesco.dto';

@Injectable()
export class VisitasInternosService {

  constructor(
    @InjectRepository(VisitaInterno)
    private readonly visitaInternoRepository: Repository<VisitaInterno>,

    private readonly novedadesCiudadanoService: NovedadesCiudadanoService
  ){}

  async create(data: CreateVisitasInternoDto): Promise<VisitaInterno> {

    let fecha_actual: any = new Date().toISOString().split('T')[0];
    data.fecha_alta = fecha_actual;
    data.usuario_id = 2;

    //controlar si y existe el vinculo entre visita e interno
    let dataVisitaInterno = await this.findOneXVinculados(data.ciudadano_id, data.interno_id);
    if(dataVisitaInterno) throw new ConflictException("La visita y el interno ya se encuentran vinculados.");
    
    //controlar si el interno esta vinculado con otra visita con estos parentescos (CONC, CONY, NOV)
    if(data.parentesco_id == "CONC" || data.parentesco_id == "CONY" || data.parentesco_id == "NOV"){
      const respuestaParejasInterno = await this.visitaInternoRepository.find({  
        where: {
          ciudadano_id: data.ciudadano_id,
          parentesco_id: In(["CONC", "CONY", "NOV"]),
        },
        
      });
      
      if(respuestaParejasInterno) throw new ConflictException("El interno ya se encuentran vinculado con otro ciudadano como Concubino/a, Conyugue o Novio/a. Sólo puede tener un ciudadno como Concubino/a, Conyugue o Novio/a.");
    
    }

    //controlar si el interno esta vinculado con otra visita con estos parentescos (MAD, PAD)
    if(data.parentesco_id == "PAD" || data.parentesco_id == "MAD"){
      const respuestaPadres = await this.visitaInternoRepository.findOneBy({  
        interno_id: data.interno_id, 
        parentesco_id: data.parentesco_id
        
      });
      
      if(respuestaPadres) throw new ConflictException("El interno ya se encuentran vinculado con otro ciudadano con éste parentesco. Sólo puede tener un ciudadno vinculado con este parentesco");
    
    }

    //controlar si la visita esta vinculada con otro interno con estos parentescos (CONC, CONY, NOV)
    if(data.parentesco_id == "CONC" || data.parentesco_id == "CONY" || data.parentesco_id == "NOV"){
      const respuestaParejasVisita = await this.visitaInternoRepository.find({  
        where: {
          ciudadano_id: data.ciudadano_id,
          parentesco_id: In(["CONC", "CONY", "NOV"]),
        },
        
      });
      
      if(respuestaParejasVisita) throw new ConflictException("El ciudadano ya se encuentran vinculado con otro interno como Concubino/a, Conyugue o Novo/ia. Sólo puede tener un interno como Concubino/a, Conyugue o Novio/a.");
    }

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
  async updateCambioParentesco(id: number, data: UpdateCambioParentescoDto, usuariox: Usuario) {
    //carga de nuevo parentesco para actualizar
    let dataVisitaInterno: CreateVisitasInternoDto = new CreateVisitasInternoDto;
    dataVisitaInterno.parentesco_id = data.parentesco_id;
    
    //buscar y controlar si existe el vinculo entre visita e interno
    let dataVisitaInternoActual = await this.findOne(id);
    if(!dataVisitaInternoActual) throw new ConflictException("La visita y el interno no se encuentran vinculados.");
    
    //controlar si el interno esta vinculado con otra visita con estos parentescos (CONC, CONY, NOV)
    if(data.parentesco_id == "CONC" || data.parentesco_id == "CONY" || data.parentesco_id == "NOV"){
      const respuestaParejasInterno = await this.visitaInternoRepository.find({  
        where: {
          ciudadano_id: dataVisitaInternoActual.ciudadano_id,
          parentesco_id: In(["CONC", "CONY", "NOV"]),
        },
        
      });
      
      if(respuestaParejasInterno) throw new ConflictException("El interno ya se encuentran vinculado con otro ciudadano como Concubino/a, Conyugue o Novio/a. Sólo puede tener un ciudadano como Concubino/a, Conyugue o Novio/a.");
    }

    //controlar si el interno esta vinculado con otra visita con estos parentescos (MAD, PAD)
    if(data.parentesco_id == "PAD" || data.parentesco_id == "MAD"){
      const respuestaPadres = await this.visitaInternoRepository.findOneBy({  
        interno_id: dataVisitaInternoActual.interno_id, 
        parentesco_id: data.parentesco_id
        
      });
      
      if(respuestaPadres) throw new ConflictException("El interno ya se encuentran vinculado con otro ciudadano con éste parentesco. Sólo puede tener un ciudadano vinculado con este parentesco");
    
    }

    //controlar si la visita esta vinculada con otro interno con estos parentescos (CONC, CONY, NOV)
    if(data.parentesco_id == "CONC" || data.parentesco_id == "CONY" || data.parentesco_id == "NOV"){
      const respuestaParejasVisita = await this.visitaInternoRepository.find({  
        where: {
          ciudadano_id: dataVisitaInternoActual.ciudadano_id,
          parentesco_id: In(["CONC", "CONY", "NOV"]),
        },
        
      });
      
      if(respuestaParejasVisita) throw new ConflictException("El ciudadano ya se encuentran vinculado con otro interno como Concubino/a, Conyugue o Novo/ia. Sólo puede tener un interno como Concubino/a, Conyugue o Novio/a.");
    }

    //actualizar cambios
    try{
      const respuesta = await this.visitaInternoRepository.update(id, dataVisitaInterno);
      if((await respuesta).affected == 1){
        if((await respuesta).affected == 1){

          //guardar novedad
          let fecha_actual: any = new Date().toISOString().split('T')[0];
          let dataNovedad: CreateNovedadesCiudadanoDto = new CreateNovedadesCiudadanoDto;
          
          
          dataNovedad.ciudadano_id = dataVisitaInternoActual.ciudadano_id;        
          dataNovedad.novedad = "CAMBIO DE PARENTESCO";
          dataNovedad.novedad_detalle = "Con interno: " + dataVisitaInternoActual.interno.apellido + " " + dataVisitaInternoActual.interno.nombre + " - Parentesco anterior: " + dataVisitaInternoActual.parentesco.parentesco + " - " + data.detalle_motivo;
          dataNovedad.organismo_id = usuariox.organismo_id;
          dataNovedad.usuario_id = usuariox.id_usuario;
          dataNovedad.fecha_novedad = fecha_actual;
                  
          await this.novedadesCiudadanoService.create(dataNovedad);
        } 
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }
  //FIN CAMBIO DE PARENTESCO....................................

  //CAMBIO DE PARENTESCO
  async updateProhibicionParentesco(id: number, data: UpdateProhibirParentescoDto, usuariox: Usuario) {
    //carga de nuevo parentesco para actualizar
    let dataVisitaInterno: CreateVisitasInternoDto = new CreateVisitasInternoDto;
    let fecha_actual: any = new Date().toISOString().split('T')[0];
    
    //buscar y controlar si existe el vinculo entre visita e interno
    let dataVisitaInternoActual = await this.findOne(id);
    if(!dataVisitaInternoActual) throw new ConflictException("La visita y el interno no se encuentran vinculados.");
    
    data.prohibido = true;
    data.fecha_prohibido = fecha_actual;

    //actualizar cambios
    try{
      const respuesta = await this.visitaInternoRepository.update(id, data);
      if((await respuesta).affected == 1){
        if((await respuesta).affected == 1){
          
          //guardar novedad          
          let dataNovedad: CreateNovedadesCiudadanoDto = new CreateNovedadesCiudadanoDto;          
          
          dataNovedad.ciudadano_id = dataVisitaInternoActual.ciudadano_id;        
          dataNovedad.novedad = "PROHIBICION DE PARENTESCO";
          dataNovedad.novedad_detalle = "Con interno: " + dataVisitaInternoActual.interno.apellido
             + " " + dataVisitaInternoActual.interno.nombre + " - Parentesco: " + dataVisitaInternoActual.parentesco.parentesco 
             + " - Desde: " + data.fecha_inicio + " hasta " + data.fecha_fin + " - OBS: " + data.detalles_prohibicion;
          dataNovedad.organismo_id = usuariox.organismo_id;
          dataNovedad.usuario_id = usuariox.id_usuario;
          dataNovedad.fecha_novedad = fecha_actual;
                  
          await this.novedadesCiudadanoService.create(dataNovedad);
        } 
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
    dataVisitaInterno.vigente = false;
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
