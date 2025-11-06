import { PartialType } from '@nestjs/mapped-types';
import { CreateIngresosInternoDto } from './create-ingresos-interno.dto';

export class UpdateIngresosInternoDto extends PartialType(CreateIngresosInternoDto) {}
