import { PartialType } from '@nestjs/mapped-types';
import { CreateBitacoraProhibicionesAnticipadaDto } from './create-bitacora-prohibiciones-anticipada.dto';

export class UpdateBitacoraProhibicionesAnticipadaDto extends PartialType(CreateBitacoraProhibicionesAnticipadaDto) {}
