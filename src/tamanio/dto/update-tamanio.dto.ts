import { PartialType } from '@nestjs/mapped-types';
import { CreateTamanioDto } from './create-tamanio.dto';

export class UpdateTamanioDto extends PartialType(CreateTamanioDto) {}
