import { PartialType } from '@nestjs/mapped-types';
import { CreateDedosHuellaDto } from './create-dedos_huella.dto';

export class UpdateDedosHuellaDto extends PartialType(CreateDedosHuellaDto) {}
