import { PartialType } from '@nestjs/mapped-types';
import { CreateMotivosAtencionDto } from './create-motivos_atencion.dto';

export class UpdateMotivosAtencionDto extends PartialType(CreateMotivosAtencionDto) {}
