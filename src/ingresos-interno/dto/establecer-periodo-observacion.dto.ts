import { Transform } from "class-transformer";
import { IsDateString, IsInt, Length } from "class-validator";


export class EstablecerPeriodoObservacionDto {
    
    @IsInt({message: "progresividad_id debe ser un número entero."})
    progresividad_id: number;

    @IsDateString()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.split('T')[0];
    })
    fecha: Date;   

    @Length(1,1000,{message: "detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
        
}
