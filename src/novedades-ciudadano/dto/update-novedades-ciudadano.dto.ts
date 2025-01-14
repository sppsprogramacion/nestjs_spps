import { PartialType } from '@nestjs/mapped-types';
import { CreateNovedadesCiudadanoDto } from './create-novedades-ciudadano.dto';

export class UpdateNovedadesCiudadanoDto extends PartialType(CreateNovedadesCiudadanoDto) {}
