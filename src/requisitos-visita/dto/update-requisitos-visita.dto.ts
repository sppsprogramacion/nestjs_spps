import { PartialType } from '@nestjs/mapped-types';
import { CreateRequisitoVisitaDto } from './create-requisitos-visita.dto';

export class UpdateRequisitoVisitaDto extends PartialType(CreateRequisitoVisitaDto) {}
