import { PartialType } from '@nestjs/mapped-types';
import { CreateTrasladosInternoDto } from './create-traslados-interno.dto';

export class UpdateTrasladosInternoDto extends PartialType(CreateTrasladosInternoDto) {}
