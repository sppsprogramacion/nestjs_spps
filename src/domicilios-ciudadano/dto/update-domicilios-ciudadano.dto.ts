import { PartialType } from '@nestjs/mapped-types';
import { CreateDomiciliosCiudadanoDto } from './create-domicilios-ciudadano.dto';

export class UpdateDomiciliosCiudadanoDto extends PartialType(CreateDomiciliosCiudadanoDto) {}
