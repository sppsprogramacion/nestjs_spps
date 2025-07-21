import { PartialType } from '@nestjs/mapped-types';
import { CreateOjosColorDto } from './create-ojos_color.dto';

export class UpdateOjosColorDto extends PartialType(CreateOjosColorDto) {}
