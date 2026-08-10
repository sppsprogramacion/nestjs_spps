import { PartialType } from '@nestjs/mapped-types';
import { CreateHuellaDto } from './create-huella.dto';

export class UpdateHuellaDto extends PartialType(CreateHuellaDto) {}
