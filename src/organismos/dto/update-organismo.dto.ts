import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganismoDto } from './create-organismo.dto';

export class UpdateOrganismoDto extends PartialType(CreateOrganismoDto) {}
