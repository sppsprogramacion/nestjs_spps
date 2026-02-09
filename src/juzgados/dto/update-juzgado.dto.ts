import { PartialType } from '@nestjs/mapped-types';
import { CreateJuzgadoDto } from './create-juzgado.dto';

export class UpdateJuzgadoDto extends PartialType(CreateJuzgadoDto) {}
