import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriasCiudadanoDto } from './create-categorias-ciudadano.dto';

export class UpdateCategoriasCiudadanoDto extends PartialType(CreateCategoriasCiudadanoDto) {}
