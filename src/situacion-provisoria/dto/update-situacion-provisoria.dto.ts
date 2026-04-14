import { PartialType } from '@nestjs/mapped-types';
import { CreateSituacionProvisoriaDto } from './create-situacion-provisoria.dto';

export class UpdateSituacionProvisoriaDto extends PartialType(CreateSituacionProvisoriaDto) {}
