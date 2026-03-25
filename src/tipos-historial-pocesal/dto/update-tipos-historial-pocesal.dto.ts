import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposHistorialPocesalDto } from './create-tipos-historial-pocesal.dto';

export class UpdateTiposHistorialPocesalDto extends PartialType(CreateTiposHistorialPocesalDto) {}
