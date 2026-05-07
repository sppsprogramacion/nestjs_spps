import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsInt, Length } from "class-validator";

export class EstablecerAlojamientoDto {
    

    @IsInt({message: "pabellon_id debe ser un número entero."})
    pabellon_id: number;

    @Length(1,10,{message: "celda debe tener entre $constraint1 y $constraint2 caracteres."})
    celda: string;
    
    @IsBoolean({message: "tiene_programa_puerta debe ser verdadero o falso"})
    tiene_programa_puerta: boolean;
    
    @IsInt({message: "situacion_provisoria_id debe ser un número entero."})
    situacion_provisoria_id: number;

    //para el historial procesal
    @IsDateString()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.split('T')[0];
    })
    fecha: Date;      

    @Length(1,1000,{message: "detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
        
}