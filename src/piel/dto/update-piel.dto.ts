import { PartialType } from '@nestjs/mapped-types';
import { CreatePielDto } from './create-piel.dto';

export class UpdatePielDto extends PartialType(CreatePielDto) {}
