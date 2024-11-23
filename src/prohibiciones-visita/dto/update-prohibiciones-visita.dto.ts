import { PartialType } from '@nestjs/mapped-types';
import { CreateProhibicionesVisitaDto } from './create-prohibiciones-visita.dto';

export class UpdateProhibicionesVisitaDto extends PartialType(CreateProhibicionesVisitaDto) {}
