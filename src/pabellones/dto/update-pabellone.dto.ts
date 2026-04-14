import { PartialType } from '@nestjs/mapped-types';
import { CreatePabelloneDto } from './create-pabellone.dto';

export class UpdatePabelloneDto extends PartialType(CreatePabelloneDto) {}
