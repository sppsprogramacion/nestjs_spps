import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuariosRolDto } from './create-usuarios-rol.dto';

export class UpdateUsuariosRolDto extends PartialType(CreateUsuariosRolDto) {}
