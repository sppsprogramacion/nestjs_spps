import { PartialType } from '@nestjs/mapped-types';
import { CreateReincidenciaDto } from './create-reincidencia.dto';

export class UpdateReincidenciaDto extends PartialType(CreateReincidenciaDto) {}
