import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuariosRolDto } from './dto/create-usuarios-rol.dto';
import { UpdateUsuariosRolDto } from './dto/update-usuarios-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRol } from './entities/usuarios-rol.entity';
import { DataSource, Repository } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class UsuariosRolService {

  constructor(    
    @InjectRepository(UsuarioRol)
    private readonly usuarioRolRepository: Repository<UsuarioRol>,
    private readonly dataSource: DataSource,
  ){}

  //NUEVO ROL DEL USUARIO
  async create(data: CreateUsuariosRolDto, usuario: Usuario): Promise<UsuarioRol> {

    let fecha_actual: any = new Date().toISOString().split('T')[0];               
    let observacionesAux : string = "ALTA ROL: " + usuario.apellido + " " + usuario.nombre + "(dni: " + usuario.dni + ")";
    
    //cargar datos por defecto
    data.fecha_alta = fecha_actual
    data.observaciones = observacionesAux;

    return await this.dataSource.transaction(
          async manager => {
    
            const usuarioRepository = manager.getRepository(Usuario);
            const usuarioRolesRepository = manager.getRepository(UsuarioRol);
  
            // ----------------------------------
            // BUSCAR USUARIO 
            // ----------------------------------
            const usuarioAuxx = await usuarioRepository
                .createQueryBuilder('usuario')
                .leftJoinAndSelect('usuario.roles','roles')
                .leftJoinAndSelect('roles.rol', 'rol')              
                .where('usuario.id_usuario = :idUsuario', {
                    idUsuario: data.usuario_id
                })
                .getOne();
  
            if (!usuarioAuxx) {
                throw new NotFoundException('No se encontraron datos del usuario al que quiere asignar el rol.');
            }
    
            if(!usuarioAuxx.activo)
              throw new NotFoundException ("El usuario al que quiere asignar el rol no esta habilitado.");
            
  
            //---------------------------------------------------
            //CONTROLAR ROLES
            //---------------------------------------------------          
              
            const listaRoles = usuarioAuxx.roles.filter(usuarioRol => usuarioRol.rol.id_rol == data.rol_id && usuarioRol.activo == true);
            
            if(listaRoles.length > 0){
              throw new NotFoundException('El usuario ya tiene este rol asugnado.');
            }
  
            //--------------------------------------------
            //CONSTRUIR RESPUESTA
            //--------------------------------------------
            try {
  
                const nuevoRol = usuarioRolesRepository.create({
                  usuario_id: data.usuario_id,
                  rol_id: data.rol_id,
                  observaciones: data.observaciones,
                  fecha_alta: fecha_actual,
                  activo: true
                  
                });
        
                const rolGuardado = await usuarioRolesRepository.save(nuevoRol);   
                
                return rolGuardado;

            }
            catch(error) {
                this.handleDBErrors(error);
            }
              
                          
          }
      );

    
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
