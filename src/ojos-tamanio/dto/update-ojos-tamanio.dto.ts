import { PartialType } from '@nestjs/mapped-types';
import { CreateOjosTamanioDto } from './create-ojos-tamanio.dto';

export class UpdateOjosTamanioDto extends PartialType(CreateOjosTamanioDto) {}
