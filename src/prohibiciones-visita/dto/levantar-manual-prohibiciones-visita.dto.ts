
import { Transform } from 'class-transformer';
import { IsDateString, Length } from 'class-validator';

export class LevantarManualProhibicionesVisitaDto {

    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_fin: Date;
    
    @Length(1,2000,{message: "El detalle_motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_motivo:string;
}
