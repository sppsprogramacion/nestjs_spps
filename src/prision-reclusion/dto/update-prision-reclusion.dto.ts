import { PartialType } from '@nestjs/mapped-types';
import { CreatePrisionReclusionDto } from './create-prision-reclusion.dto';

export class UpdatePrisionReclusionDto extends PartialType(CreatePrisionReclusionDto) {}
