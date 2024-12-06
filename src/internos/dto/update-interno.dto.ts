import { PartialType } from '@nestjs/mapped-types';
import { CreateInternoDto } from './create-interno.dto';

export class UpdateInternoDto extends PartialType(CreateInternoDto) {}
