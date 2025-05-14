import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitasInternoDto } from './create-visitas-interno.dto';
import { Length } from 'class-validator';

export class DetalleCambioVisitasInternoDto {

    @Length(1,1500,{message: "El detalle_motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_motivo: string;
}
