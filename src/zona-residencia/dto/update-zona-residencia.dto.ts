import { PartialType } from '@nestjs/mapped-types';
import { CreateZonaResidenciaDto } from './create-zona-residencia.dto';

export class UpdateZonaResidenciaDto extends PartialType(CreateZonaResidenciaDto) {}
