import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsInt, Length } from "class-validator";


export class EstablecerPeriodoPruebaDto {
    
    @IsInt({message: "progresividad_id debe ser un número entero."})
    progresividad_id: number;

    @IsBoolean({message: "tiene_granja debe ser verdadero o falso"})
    tiene_granja: boolean;

    @IsBoolean({message: "tiene_semilibertad debe ser verdadero o falso"})
    tiene_semilibertad: boolean;

    @IsBoolean({message: "tiene_transitoria debe ser verdadero o falso"})
    tiene_transitoria: boolean;
    
    @IsDateString()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.split('T')[0];
    })
    fecha: Date;      

    @Length(1,1000,{message: "detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
        
}