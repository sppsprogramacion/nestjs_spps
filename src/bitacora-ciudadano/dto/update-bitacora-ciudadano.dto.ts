import { PartialType } from '@nestjs/mapped-types';
import { CreateBitacoraCiudadanoDto } from './create-bitacora-ciudadano.dto';

export class UpdateBitacoraCiudadanoDto extends PartialType(CreateBitacoraCiudadanoDto) {}
