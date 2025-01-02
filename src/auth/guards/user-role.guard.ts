import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { ValidRoles } from '../interfaces/valid-roles';
import { Length } from 'class-validator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector //puedo ver informacion de los decoradores y de la metadata
  ){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    //obtener metadata del controlador, obtiene los roles( @SetMetadata ('roles', ['admin','superadmin']) ) 
    //roles (se cambia por META_ROLES) es el nombre de la metadata... context.getHandler() es el target
    //META_ROLES son los roles establecidos como validos para la ruta
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler() )

    //sino existe puede tener cualquier rol para acceder
    if ( !validRoles ) return true;
    //si viene vacio cualquier rol puede acceder porque no hay configurado un rol especifico
    if ( validRoles.length === 0 ) return true;

    //obtener usuario de la request
    const req = context.switchToHttp().getRequest();
    const user = req.user as Usuario;

    if ( !user )
      throw new BadRequestException ("Usuario no encontrado");

    //validacion si el rol del usuario es parte de los roles establecidos como validos para la ruta
    for (const rol of user.roles){
      if(validRoles.includes( rol.rol_id )){
        return true;
      }
    }
    
    

    //cuando el usuario no tiene un rol valido para la ruta
    throw new ForbiddenException(
      `Usuario ${ user.apellido + " " + user.nombre } necesita un rol valido. ${validRoles}`
    )
    
  }
}
