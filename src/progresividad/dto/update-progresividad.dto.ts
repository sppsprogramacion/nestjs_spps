import { PartialType } from '@nestjs/mapped-types';
import { CreateProgresividadDto } from './create-progresividad.dto';

export class UpdateProgresividadDto extends PartialType(CreateProgresividadDto) {}
