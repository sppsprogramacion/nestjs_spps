import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganismosDestinoDto } from './create-organismos_destino.dto';

export class UpdateOrganismosDestinoDto extends PartialType(CreateOrganismosDestinoDto) {}
