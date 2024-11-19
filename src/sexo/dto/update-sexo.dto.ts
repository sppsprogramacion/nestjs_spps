import { PartialType } from '@nestjs/mapped-types';
import { CreateSexoDto } from './create-sexo.dto';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateSexoDto extends PartialType(CreateSexoDto) {

   
}
