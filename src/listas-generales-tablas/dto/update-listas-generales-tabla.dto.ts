import { PartialType } from '@nestjs/mapped-types';
import { CreateListasGeneralesTablaDto } from './create-listas-generales-tabla.dto';

export class UpdateListasGeneralesTablaDto extends PartialType(CreateListasGeneralesTablaDto) {}
