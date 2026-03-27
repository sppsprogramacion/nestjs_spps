import { PartialType } from '@nestjs/mapped-types';
import { CreateOcupacioneDto } from './create-ocupacione.dto';

export class UpdateOcupacioneDto extends PartialType(CreateOcupacioneDto) {}
