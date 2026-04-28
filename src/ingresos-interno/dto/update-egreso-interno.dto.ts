import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsInt, Length } from "class-validator";


export class UpdateEgresoInternoDto {
    
    @IsBoolean({message: "esta_liberado debe ser verdadero o falso"})
    esta_liberado: boolean;

    @IsDateString()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.split('T')[0];
    })
    fecha_egreso: Date;      
    
    @IsInt({message: "motivo_egreso_id debe ser un número entero."})
    motivo_egreso_id: number;

    @Length(1,10,{message: "juzgado_libera_id debe tener entre $constraint1 y $constraint2 caracteres."})
    juzgado_libera_id: string;

    @Length(1,500,{message: "domicilio_libertad debe tener entre $constraint1 y $constraint2 caracteres."})
    domicilio_libertad: string;

    @Length(1,2000,{message: "detalles_egreso debe tener entre $constraint1 y $constraint2 caracteres."})
    detalles_egreso: string;
}
