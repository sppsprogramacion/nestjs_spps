import { PartialType } from '@nestjs/mapped-types';
import { CreateDriveImageneDto } from './create-drive-imagene.dto';

export class UpdateDriveImageneDto extends PartialType(CreateDriveImageneDto) {}
