import { Transform } from "class-transformer";
import { IsDateString, Length } from "class-validator";

export class UpdateProhibicionesVisitaDto {
    
    @Length(1,100,{message: "La disposicion debe tener entre $constraint1 y $constraint2 caracteres."})
    disposicion: string;
   
    @Length(1,2000,{message: "El detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
   
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_inicio: Date;

    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_fin: Date;

    @Length(1,2000,{message: "El detalle_motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_motivo: string;

}
