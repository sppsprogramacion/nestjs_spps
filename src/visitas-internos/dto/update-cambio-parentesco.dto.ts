import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitasInternoDto } from './create-visitas-interno.dto';
import { Length } from 'class-validator';

export class UpdateCambioParentescoDto {

    @Length(1,100,{message: "El parentesco_id debe tener entre $constraint1 y $constraint2 caracteres."})
    parentesco_id: string;

    @Length(1,1500,{message: "El detalle_motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_motivo: string;
}
