import { PartialType } from '@nestjs/mapped-types';
import { CreateAbogadosInternoDto } from './create-abogados-interno.dto';

export class UpdateAbogadosInternoDto extends PartialType(CreateAbogadosInternoDto) {}
