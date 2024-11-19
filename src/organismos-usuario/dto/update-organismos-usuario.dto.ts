import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganismosUsuarioDto } from './create-organismos-usuario.dto';

export class UpdateOrganismosUsuarioDto extends PartialType(CreateOrganismosUsuarioDto) {}
