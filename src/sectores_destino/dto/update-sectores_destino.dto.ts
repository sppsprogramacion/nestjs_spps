import { PartialType } from '@nestjs/mapped-types';
import { CreateSectoresDestinoDto } from './create-sectores_destino.dto';

export class UpdateSectoresDestinoDto extends PartialType(CreateSectoresDestinoDto) {}
