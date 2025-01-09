
import { IsDateString, Length } from 'class-validator';

export class AnularProhibicionesVisitaDto {

    @IsDateString()
    fecha_fin: Date;

    @Length(1,2000,{message: "El detalle_motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_motivo:string;
}
