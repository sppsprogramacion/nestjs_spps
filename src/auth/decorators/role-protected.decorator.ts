import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../interfaces';

//roles validos para la ruta, se lo utilaza en el UserRolGuard para obtener los roles permitidos para la ruta
export const META_ROLES = 'roles';

//...args es un arreglo de ValidRoles que obtiene los roles de la ruta protegida,
// entonces solo se admitiran los roles del enum
export const RoleProtected = (...args: ValidRoles[]) => {

    //devuelve los roles que son validos para la ruta protegida.
    return SetMetadata(META_ROLES , args);

}