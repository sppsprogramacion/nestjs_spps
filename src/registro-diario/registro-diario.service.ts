import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRegistroDiarioDto } from './dto/create-registro-diario.dto';
import { UpdateRegistroDiarioDto } from './dto/update-registro-diario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistroDiario } from './entities/registro-diario.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class RegistroDiarioService {
  
  constructor(
    @InjectRepository(RegistroDiario)
    private readonly registroDiarioRepository: Repository<RegistroDiario>
  ){}

  async create(data: CreateRegistroDiarioDto, usuario: Usuario): Promise<RegistroDiario> {

    //cargar datos por defecto
    let fecha_actual: any = new Date().toISOString().split('T')[0];    
    let hora_actual: string = new Date().toTimeString().split(' ')[0]; // HH:MM:SS 

    data.fecha_ingreso = fecha_actual;  
    data.hora_ingreso = hora_actual;
    data.anulado = false;
    
    try {
      
      const nuevo = await this.registroDiarioRepository.create(data);
      return await this.registroDiarioRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  async findAll() {
    return await this.registroDiarioRepository.find(
      {
          order:{
              id_resgistro_diario: "ASC"
          }
      }
    );
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.registroDiarioRepository.findOneBy({id_resgistro_diario: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateRegistroDiarioDto) {

    try{
      const respuesta = await this.registroDiarioRepository.update(id, data);
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
    const respuesta = await this.registroDiarioRepository.findOneBy({id_resgistro_diario: id});
    if(!respuesta) throw new NotFoundException("No existe el registro que intenta eliminar");
    return await this.registroDiarioRepository.remove(respuesta);
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
