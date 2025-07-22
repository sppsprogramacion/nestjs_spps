import { PartialType } from '@nestjs/mapped-types';
import { CreatePeloTipoDto } from './create-pelo-tipo.dto';

export class UpdatePeloTipoDto extends PartialType(CreatePeloTipoDto) {}
