import { PartialType } from '@nestjs/mapped-types';
import { CreateEstadoProcesalDto } from './create-estado-procesal.dto';

export class UpdateEstadoProcesalDto extends PartialType(CreateEstadoProcesalDto) {}
