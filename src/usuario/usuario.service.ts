import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { UpdateUsuarioPassDto } from './dto/update-usuario-pass.dto';
import { UpdateUsuarioMiPassDto } from './dto/update-usuario-mi-pass.dto';
import { UsuarioRol } from 'src/usuarios-rol/entities/usuarios-rol.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
    private readonly dataSource: DataSource,
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
  async findUsuariosActivos(activox: boolean) {
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
  //FIN BUSCAR USUARIOS ACTIVOS O INACTIVOS 
  // .......................................................................
    
  //BUSCAR USUARIOS ACTIVOS X ORGANISMO y SISTEMA
  async findListaUsuariosActivosXOrganismoSistema(usuario: Usuario, sistema: string) {
    
    const listaUsuarios = await this.usuariosRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.sexo', 'sexo')
      .leftJoinAndSelect('usuario.organismo', 'organismo')
      .innerJoinAndSelect('usuario.roles','roles',
          'roles.activo = :rolActivo',
          { rolActivo: true }
      )
      .innerJoinAndSelect('roles.rol', 'rol')
      .innerJoinAndSelect('rol.sistema', 'sistema')
      .where('usuario.activo = :activo', { activo: true })
      .andWhere('usuario.organismo_id = :organismoId', {
        organismoId: usuario.organismo_id
      })
      .andWhere('rol.sistema_id = :sistema', { sistema })
      .orderBy('usuario.apellido', 'ASC')
      .getMany();


    // Transformar los roles
    const usuariosResponse = listaUsuarios.map(usuario => ({
      ...usuario,
      roles: usuario.roles.map(rol => rol.rol_id)
    }));
    
    return usuariosResponse;
  }
  //FIN BUSCAR USUARIOS ACTIVOS X ORGANISMO y  SISTEMA
  // .......................................................................

  //BUSCAR  XID
  async findOne(id: number) {
    const respuesta = await this.usuariosRepository.findOne(
      {
        relations: ['roles'], 
        where: {
          id_usuario: id,          
        },
      }
    );
    
    if (!respuesta) throw new NotFoundException("No se encontró el registro de usuario solicitado.");
    
    const {roles, ...usuarioData} = respuesta

    return {
      ...usuarioData,
      roles: roles.map((rol) => rol.rol_id)
    }
  }
  //FIN BUSCAR  XID..................................................................

  
  //BUSCAR  XID
  // async findOne(id: number) {
  //   const usuario = await this.usuariosRepository.createQueryBuilder('usuario')
  //   .leftJoin('usuarios_rol.rol', 'rol')
  //   .where('usuario.id_usuario = :id_usuario', { id_usuario: id })
  //   .select(['usuario'])
  //   .getOne();
    
  //   if (!usuario) throw new NotFoundException("No se encontró el registro de usuario solicitado.");

  //   return usuario;
  // }
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
            
      return respuesta;

    }
    catch(error){
      this.handleDBErrors(error);

    }
  }
  //FIN MODIFICAR PASSWORD.......................................

  //MODIFICAR MI PASSWORD
  async updateMiPassword(data: UpdateUsuarioMiPassDto, usuario: Usuario) {
    
    //obtener usuario
    const usuarioAUX = await this.usuariosRepository.createQueryBuilder('usuario')
        .where('usuario.id_usuario = :idUsuario', { idUsuario: usuario.id_usuario })
        .select(['usuario.dni', 'usuario.clave', 'usuario.id_usuario', 'usuario.activo'])
        .getOne();
    
    //controlar usuario
    if(!usuarioAUX)
      throw new UnauthorizedException ("No se encontraron datos del usuario.");
    
    if(!usuarioAUX.activo)
      throw new UnauthorizedException ("El usuario no esta habilitado.");
    
    //verificar si la clave actual ingresada por el usuario coincide con la clave registrada
    const claveISValida = await bcrypt.compare(data.clave_actual,usuarioAUX.clave);
  
    if (!claveISValida)
      throw new UnauthorizedException("La contraseña actual ingresada no es valida.");
    
    //verificar que la nueva contraseña no sea igual a la actual
    if (await bcrypt.compare(data.clave, usuarioAUX.clave)) {
      throw new BadRequestException("La nueva contraseña debe ser diferente a la actual.");
    }
    
    //GUARDAR NUEVA CLAVE
    // Encriptar nueva clave
    const nuevaClave = await bcrypt.hash(data.clave, 10);

    try{

      const respuesta = await this.usuariosRepository.update(
        usuario.id_usuario,{ clave: nuevaClave }
      );

      return respuesta;
    }
    catch(error){
      this.handleDBErrors(error);

    }
  }
  //FIN MODIFICAR MI PASSWORD
  // .................................................................................

  //DESHABILITAR ROL DE UN USUARIO
  async updateDeshabilitarRol(idUsuarioDeshabilitar: number, sistema: string, usuario: Usuario) {
    
    return await this.dataSource.transaction(
        async manager => {
  
          const usuarioRepository = manager.getRepository(Usuario);
          const usuarioRolRepository = manager.getRepository(UsuarioRol);

          // ----------------------------------
          // BUSCAR USUARIO A DESHABILITAR
          // ----------------------------------
          const usuarioDeshabilitar = await usuarioRepository
              .createQueryBuilder('usuario')
              .leftJoinAndSelect('usuario.roles','roles')
              .leftJoinAndSelect('roles.rol', 'rol')              
              .where('usuario.id_usuario = :idUsuario', {
                  idUsuario: idUsuarioDeshabilitar
              })
              .getOne();

          if (!usuarioDeshabilitar) {
              throw new NotFoundException('No se encontraron datos del usuario que quiere deshabilitar.');
          }

          if (usuarioDeshabilitar.organismo_id != usuario.organismo_id) {
              throw new NotFoundException('El usuario que quiere deshabilitar no es de su organismo.');
          }

          if(!usuarioDeshabilitar.activo)
            throw new UnauthorizedException ("El usuario que quiere deshabilitar ya se encontraba deshabilitado.");
          

          //---------------------------------------------------
          //CONTROLAR ROLES
          //---------------------------------------------------          
          if(usuarioDeshabilitar.roles.length == 0){
            throw new NotFoundException('El usuario al que quiere quitar del sistema no tiene permisos en este sistema.');
          }

          const listaRoles = usuarioDeshabilitar.roles.filter(usuarioRol => usuarioRol.rol.sistema_id == sistema && usuarioRol.activo == true);
          
          if(listaRoles.length == 0){
            throw new NotFoundException('El usuario al que quiere quitar del sistema no tiene permisos habilitados en este sistema.');
          }

          const rolUsuario = listaRoles.find(rolUsuario => rolUsuario.rol_id == "restriccionAdmin" || rolUsuario.rol_id == "ciudadanoAdmin" || rolUsuario.rol_id == "judicialAdmin")
          
          if(rolUsuario)
            throw new NotFoundException('No puede quitar del sistema a un usuario administrador');

          //--------------------------------------------
          //CONSTRUIR RESPUESTA
          //--------------------------------------------
          try {

              // Obtener los ID de los registros de usuarios_rol
              const listaIdsUsuarioRoles = listaRoles.map(
                  usuarioRol => usuarioRol.id_usuario_rol
              );
          
              // Deshabilitar todos los roles del usuario en ese sistema
              const respuesta = await usuarioRolRepository.update(
                  {
                      id_usuario_rol: In(listaIdsUsuarioRoles)
                  },
                  {
                      activo: false,
                      fecha_baja: new Date()
                  }
              );
          
              return respuesta;
          
          }
          catch(error) {
              this.handleDBErrors(error);
          }
            
                        
        }
    );
  }
  //FIN DESHABILITAR ROL DE UN USUARIO
  //.................................................................................

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
