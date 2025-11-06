import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganismosExternoDto } from './create-organismos-externo.dto';

export class UpdateOrganismosExternoDto extends PartialType(CreateOrganismosExternoDto) {}
