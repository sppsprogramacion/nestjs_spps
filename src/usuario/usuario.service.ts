import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioPassDto } from './dto/update-usuario-pass.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>
  ){}
  async create(data: CreateUsuarioDto): Promise<Usuario> {      

    try {
      const {clave, ...usuarioData} = data;
      const nuevo: Usuario = await this.usuariosRepository.create({
        ...usuarioData,
        clave: bcrypt.hashSync(clave,10)
      });
      return await this.usuariosRepository.save(nuevo);

    } catch (error) {      
      this.handleDBErrors(error);

    }
  }

  async findAll() {
    return await this.usuariosRepository.findAndCount(
      {
          order:{
              apellido: "ASC"
          }
      }
    );
  }

  //BUSCAR USUARIOS ACTIVOS O INACTIVOS
  async findUsuarios(activox: boolean) {
    const usuarios = await this.usuariosRepository.findAndCount(
      {        
        where: {
          activo: activox,          
        },
        order:{
          apellido: "ASC"
        }
      }
    );   
    return usuarios;
  }
  //FIN BUSCAR USUARIOS ACTIVOS O INACTIVOS ..........................................
  
  //BUSCAR USUARIOS ACTIVOS O INACTIVOS CON CENTROS DE MEDIACION
  async findUsuariosCentrosMediacion(activox: boolean) {
    const usuarios_centros = await this.usuariosRepository.findAndCount(
      {
        relations: ['centros_mediacion'], 
        where: {
          activo: activox,          
        },
        order: {
          apellido: "ASC"
        }
      }
    );   
    return usuarios_centros;
  }
  //FIN BUSCAR TRAMITES NUEVOS..........................................

  //BUSCAR  XDni
  async findXDni(dnix: number) {
    const respuesta = await this.usuariosRepository.findOneBy({dni: dnix});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de usuario solicitado.");
    return respuesta;
  }
  //FIN BUSCAR  XDni..................................................................

  //BUSCAR  XID
  async findOne(id: number) {
    const respuesta = await this.usuariosRepository.findOneBy({id_usuario: id});
    if (!respuesta) throw new NotFoundException("No se encontró el registro de usuario solicitado.");

    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  
  //MODIFICAR CIUDADANO
  async update(idx: number, data: UpdateUsuarioDto) {

    try{
      const respuesta = await this.usuariosRepository.update(idx, data);
      // if(( await respuesta).affected == 0){
      //   await this.findXDni(dnix);
      //   throw new InternalServerErrorException("No se modificó el registro.");
      // } 
      
      return respuesta;

    }
    catch(error){
      this.handleDBErrors(error);

    }
  }
  //FIN MODIFICAR CIUDADANO.......................................

  //MODIFICAR PASSWORD
  async updatePassword(idx: number, data: UpdateUsuarioPassDto) {
    const clavex: string = bcrypt.hashSync(data.clave, 10);
    data.clave = clavex;
    try{
      const respuesta = await this.usuariosRepository.update(idx, data);
      // if(( await respuesta).affected == 0){
      //   await this.findXDni(dnix);
      //   throw new InternalServerErrorException("No se modificó el registro.");
      // } 
      
      return respuesta;

    }
    catch(error){
      this.handleDBErrors(error);

    }
  }
  //FIN MODIFICAR PASSWORD.......................................

  async remove(dnix: number) {
    const respuesta = await this.usuariosRepository.findOneBy({dni: dnix});
    if(!respuesta) throw new NotFoundException("No existe el registro de usuario que intenta eliminar");
    return await this.usuariosRepository.remove(respuesta);
  }

  ///MANEJO DE ERRORES
  private handleDBErrors(error: any): never {
    if(error.code === "ER_DUP_ENTRY"){
      throw new BadRequestException (error.sqlMessage);
    }
    
    if(error.status == 404) throw new NotFoundException(error.response);
  
    throw new InternalServerErrorException (error.message);
    }
    //FIN MANEJO DE ERRORES........................................

}
