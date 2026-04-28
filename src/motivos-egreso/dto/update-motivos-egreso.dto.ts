import { PartialType } from '@nestjs/mapped-types';
import { CreateMotivosEgresoDto } from './create-motivos-egreso.dto';

export class UpdateMotivosEgresoDto extends PartialType(CreateMotivosEgresoDto) {}
