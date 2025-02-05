import { PartialType } from '@nestjs/mapped-types';
import { CreateCiudadanosCategoriaDto } from './create-ciudadanos-categoria.dto';

export class UpdateCiudadanosCategoriaDto extends PartialType(CreateCiudadanosCategoriaDto) {}
