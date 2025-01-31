import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposAccesoDto } from './create-tipos_acceso.dto';

export class UpdateTiposAccesoDto extends PartialType(CreateTiposAccesoDto) {}
