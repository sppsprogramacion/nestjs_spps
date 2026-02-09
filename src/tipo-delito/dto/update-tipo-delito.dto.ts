import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoDelitoDto } from './create-tipo-delito.dto';

export class UpdateTipoDelitoDto extends PartialType(CreateTipoDelitoDto) {}
