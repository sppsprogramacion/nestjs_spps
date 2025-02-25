import { PartialType } from '@nestjs/mapped-types';
import { CreateMenoresACargoDto } from './create-menores_a_cargo.dto';

export class UpdateMenoresACargoDto extends PartialType(CreateMenoresACargoDto) {}
