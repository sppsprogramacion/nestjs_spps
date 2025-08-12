import { PartialType } from '@nestjs/mapped-types';
import { CreateParentescosMenoreDto } from './create-parentescos-menore.dto';

export class UpdateParentescosMenoreDto extends PartialType(CreateParentescosMenoreDto) {}
