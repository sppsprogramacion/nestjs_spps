import { PartialType } from '@nestjs/mapped-types';
import { CreateDomiciliosInternoDto } from './create-domicilios-interno.dto';

export class UpdateDomiciliosInternoDto extends PartialType(CreateDomiciliosInternoDto) {}
