import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialProcesalDto } from './create-historial-procesal.dto';

export class UpdateHistorialProcesalDto extends PartialType(CreateHistorialProcesalDto) {}
