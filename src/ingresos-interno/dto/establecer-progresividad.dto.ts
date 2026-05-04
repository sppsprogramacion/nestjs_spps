import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsInt, Length } from "class-validator";


export class EstablecerProgresividadDto {
    
    @IsInt({message: "trimestre_id debe ser un número entero."})
    trimestre_id: number;

    @IsInt({message: "conducta_id debe ser un número entero."})
    conducta_id: number;

    @IsInt({message: "concepto_id debe ser un número entero."})
    concepto_id: number;

    @IsInt({message: "progresividad_id debe ser un número entero."})
    progresividad_id: number;

    @IsInt({message: "fase_id debe ser un número entero."})
    fase_id: number;

    @IsBoolean({message: "tiene_extramuro debe ser verdadero o falso"})
    tiene_extramuro: boolean;

    @IsBoolean({message: "tiene_granja debe ser verdadero o falso"})
    tiene_granja: boolean;

    @IsBoolean({message: "tiene_semilibertad debe ser verdadero o falso"})
    tiene_semilibertad: boolean;

    @IsBoolean({message: "tiene_transitoria debe ser verdadero o falso"})
    tiene_transitoria: boolean;    

    //para el historial procesal
    @IsDateString()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.split('T')[0];
    })
    fecha: Date;      

    //para el historial procesal
    @Length(1,1000,{message: "detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
        
}