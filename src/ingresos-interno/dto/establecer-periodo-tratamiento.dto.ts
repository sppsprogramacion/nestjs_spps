import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsInt, Length } from "class-validator";


export class EstablecerPeriodoTratamientoDto {
    
    @IsInt({message: "progresividad_id debe ser un número entero."})
    progresividad_id: number;

    @IsInt({message: "fase_id debe ser un número entero."})
    fase_id: number;

    @IsBoolean({message: "tiene_extramuro debe ser verdadero o falso"})
    tiene_extramuro: boolean;

    @IsDateString()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.split('T')[0];
    })
    fecha: Date;      

    @Length(1,1000,{message: "detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
        
}