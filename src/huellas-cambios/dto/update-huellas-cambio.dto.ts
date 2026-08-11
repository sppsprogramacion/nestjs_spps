import { PartialType } from '@nestjs/mapped-types';
import { CreateHuellasCambioDto } from './create-huellas-cambio.dto';

export class UpdateHuellasCambioDto extends PartialType(CreateHuellasCambioDto) {}
