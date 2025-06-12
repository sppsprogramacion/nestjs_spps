import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCiudadanosCategoriaDto } from './dto/create-ciudadanos-categoria.dto';
import { UpdateCiudadanosCategoriaDto } from './dto/update-ciudadanos-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CiudadanoCategoria } from './entities/ciudadanos-categoria.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UpdateAnularCategoriaDto } from './dto/update-anular-categoria.dto';

@Injectable()
export class CiudadanosCategoriasService {
  
  constructor(
    @InjectRepository(CiudadanoCategoria)
    private readonly ciudadanoCategoriaRepository: Repository<CiudadanoCategoria>
  ){}

  async create(data: CreateCiudadanosCategoriaDto, usuario: Usuario): Promise<CiudadanoCategoria> {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    

    data.fecha_carga = fecha_actual;
    data.organismo_id = usuario.organismo_id;
    data.usuario_id = usuario.id_usuario;

    //controlar si y existe el vinculo entre visita e interno
    let dataVisitaInterno = await this.findOneXVinculados(data.ciudadano_id, data.categoria_ciudadano_id);
    if(dataVisitaInterno) throw new ConflictException("El ciudadano ya tiene esta categoria asignada y activa.");
        
    try {
      
      const nuevo = await this.ciudadanoCategoriaRepository.create(data);
      return await this.ciudadanoCategoriaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.ciudadanoCategoriaRepository.find(
      {
          order:{
              id_ciudadano_categoria: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.ciudadanoCategoriaRepository.findOneBy({id_ciudadano_categoria: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  //BUSCAR LISTA XCIUDADANO
  async findXCiudadano(id_ciudadanox: number) {    
    
      const prohibiciiones = await this.ciudadanoCategoriaRepository.find(
        {        
          where: {
            ciudadano_id: id_ciudadanox
          },
          order:{
            id_ciudadano_categoria: "DESC"
          }
        }
      );   
          
      return prohibiciiones;
    
  }
  //FIN BUSCAR LISTA XCIUDADANO..................................................................

  //BUSCAR LISTA VIGENTES XCIUDADANO
  async findVigentesXCiudadano(id_ciudadanox: number) {    
    
    const prohibiciiones = await this.ciudadanoCategoriaRepository.find(
      {        
        where: {
          ciudadano_id: id_ciudadanox,
          vigente: true
        },
        order:{
          id_ciudadano_categoria: "DESC"
        }
      }
    );   
        
    return prohibiciiones;
  
  }
  //FIN BUSCAR LISTA VIGENTES XCIUDADANO..................................................................


  //QUITAR VIGENTE
  async quitarVigente(id_ciudadano_categoriax: number, data: UpdateAnularCategoriaDto, usuariox: Usuario) {
    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 
    
    let detalle: string= data.detalle_quitar_categoria + " - (Usuario: " + usuariox. apellido + " " + usuariox.nombre + " - " + fecha_actual + " " + hora_actual + ")";
    data.vigente = false;
    data.detalle_quitar_categoria = detalle;
    
    //controlar si el resgistro ya esta como vigente=false
    const categoria = await this.ciudadanoCategoriaRepository.findOneBy({id_ciudadano_categoria: id_ciudadano_categoriax});
    if(categoria){
      if(!categoria.vigente) throw new NotFoundException("No se puede realizar la modificación. Este registro ya se encuentra establecido como no vigente");
    }
    else{
      throw new NotFoundException("El elemento solicitado no existe.");
    }
  
    //guardar
    try{
      const respuesta = await this.ciudadanoCategoriaRepository.update(id_ciudadano_categoriax, data);
      
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }  
  //FIN QUITAR VIGENTE


  async update(id: number, data: UpdateCiudadanosCategoriaDto) {

    try{
      const respuesta = await this.ciudadanoCategoriaRepository.update(id, data);
      if((await respuesta).affected == 0){
        await this.findOne(id);
      } 
      return respuesta;
    }
    catch(error){
      
      this.handleDBErrors(error); 
    }   
  }

  async remove(id: number) {
    const respuesta = await this.ciudadanoCategoriaRepository.findOneBy({id_ciudadano_categoria: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de ciudadano_categoria que intenta eliminar");
    return await this.ciudadanoCategoriaRepository.remove(respuesta);
  }

  //BUSCAR  XVINCULADOS
  async findOneXVinculados(id_ciudadano: number, id_categoria: number) {

    const respuesta = await this.ciudadanoCategoriaRepository.findOneBy({  
        categoria_ciudadano_id: id_categoria, 
        ciudadano_id: id_ciudadano,
        vigente: true
        
    });   

    return respuesta;
  }
  //FIN BUSCAR  XVINCULADOS..................................................................

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
