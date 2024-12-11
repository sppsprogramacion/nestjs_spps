import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitasInternoDto } from './create-visitas-interno.dto';

export class UpdateVisitasInternoDto extends PartialType(CreateVisitasInternoDto) {}
