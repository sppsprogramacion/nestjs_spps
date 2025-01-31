import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposAtencionDto } from './create-tipos_atencion.dto';

export class UpdateTiposAtencionDto extends PartialType(CreateTiposAtencionDto) {}
