import { PartialType } from '@nestjs/mapped-types';
import { CreateCaracteristicasPersonaleDto } from './create-caracteristicas-personale.dto';

export class UpdateCaracteristicasPersonaleDto extends PartialType(CreateCaracteristicasPersonaleDto) {}
