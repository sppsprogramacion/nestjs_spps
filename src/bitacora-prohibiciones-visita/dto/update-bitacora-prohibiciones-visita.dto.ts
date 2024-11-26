import { PartialType } from '@nestjs/mapped-types';
import { CreateBitacoraProhibicionesVisitaDto } from './create-bitacora-prohibiciones-visita.dto';

export class UpdateBitacoraProhibicionesVisitaDto extends PartialType(CreateBitacoraProhibicionesVisitaDto) {}
