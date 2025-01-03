import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuariosRolDto } from './dto/create-usuarios-rol.dto';
import { UpdateUsuariosRolDto } from './dto/update-usuarios-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRol } from './entities/usuarios-rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosRolService {

  constructor(    
    @InjectRepository(UsuarioRol)
    private readonly usuarioRolRepository: Repository<UsuarioRol>
  ){}

  //NUEVO ROL DEL USUARIO
  async create(data: CreateUsuariosRolDto): Promise<UsuarioRol> {

    let fecha_actual: any = new Date().toISOString().split('T')[0];               
    
    //cargar datos por defecto
    data.fecha_alta = fecha_actual

    const usuarioRol = await this.usuarioRolRepository.findOneBy(
      {
        usuario_id: data.usuario_id,
        rol_id: data.rol_id,
        activo: true
      }
    );

    if(usuarioRol) throw new NotFoundException("El usuario ya tiene este rol asignado.");

    try {
      const nuevo = await this.usuarioRolRepository.create(data);
      return await this.usuarioRolRepository.save(nuevo);
    }catch (error) {

      this.handleDBErrors(error);  
    }     
  }

  //FIN NUEVO ROL DEL USUARIO.........................

  async findAll() {
    return await this.usuarioRolRepository.find();
  }

  //BUSCAR  XID
  async findOne(id: number) {

    const respuesta = await this.usuarioRolRepository.findOneBy({id_usuario_rol: id});
    if (!respuesta) throw new NotFoundException("El elemento solicitado no existe.");
    return respuesta;
  }
  //FIN BUSCAR  XID..................................................................

  async update(id: number, data: UpdateUsuariosRolDto) {

    try{
      const respuesta = await this.usuarioRolRepository.update(id, data);
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
    const respuesta = await this.usuarioRolRepository.findOneBy({id_usuario_rol: id});
    if(!respuesta) throw new NotFoundException("No existe el registro de usuario_rol que intenta eliminar");
    return await this.usuarioRolRepository.remove(respuesta);
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
