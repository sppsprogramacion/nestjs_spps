import { PartialType } from '@nestjs/mapped-types';
import { CreateEntradasSalidaDto } from './create-entradas-salida.dto';

export class UpdateEntradasSalidaDto extends PartialType(CreateEntradasSalidaDto) {}
