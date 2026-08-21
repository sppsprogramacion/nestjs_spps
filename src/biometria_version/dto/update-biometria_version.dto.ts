import { PartialType } from '@nestjs/mapped-types';
import { CreateBiometriaVersionDto } from './create-biometria_version.dto';

export class UpdateBiometriaVersionDto extends PartialType(CreateBiometriaVersionDto) {}
