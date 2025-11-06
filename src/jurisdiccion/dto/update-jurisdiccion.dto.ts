import { PartialType } from '@nestjs/mapped-types';
import { CreateJurisdiccionDto } from './create-jurisdiccion.dto';

export class UpdateJurisdiccionDto extends PartialType(CreateJurisdiccionDto) {}
