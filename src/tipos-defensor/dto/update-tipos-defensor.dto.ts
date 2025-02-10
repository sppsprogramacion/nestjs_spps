import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposDefensorDto } from './create-tipos-defensor.dto';

export class UpdateTiposDefensorDto extends PartialType(CreateTiposDefensorDto) {}
