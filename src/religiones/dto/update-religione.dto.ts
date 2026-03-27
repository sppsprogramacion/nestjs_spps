import { PartialType } from '@nestjs/mapped-types';
import { CreateReligioneDto } from './create-religione.dto';

export class UpdateReligioneDto extends PartialType(CreateReligioneDto) {}
