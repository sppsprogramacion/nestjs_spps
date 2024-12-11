import { PartialType } from '@nestjs/mapped-types';
import { CreateParentescoDto } from './create-parentesco.dto';

export class UpdateParentescoDto extends PartialType(CreateParentescoDto) {}
