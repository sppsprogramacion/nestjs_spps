import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateHuellaDto } from './dto/create-huella.dto';
import { UpdateHuellaDto } from './dto/update-huella.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Huella } from './entities/huella.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class HuellasService {
  
  constructor(
    @InjectRepository(Huella)
    private readonly huellaRepository: Repository<Huella>
  ){}

  async create(data: CreateHuellaDto, usuario: Usuario): Promise<Huella> {
    
    data.activo = true;

    data.detalle_motivo =
        data.detalle_motivo ?? 'Registro de huella';

    data.usuario_id = usuario.id_usuario;

    data.organismo_id = usuario.organismo_id;

    try {
      
      const nuevo = await this.huellaRepository.create(data);
      return await this.huellaRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.huellaRepository.find(
      {
          order:{
              dedo_huella: "ASC"
          }
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
      const respuesta = await this.huellaRepository.update(id, data);
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
