import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelesEducacionDto } from './create-niveles-educacion.dto';

export class UpdateNivelesEducacionDto extends PartialType(CreateNivelesEducacionDto) {}
