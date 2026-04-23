import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsInt, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateHistorialProcesalDto {
    //@IsInt({message: "tipo_historial_procesal_id debe ser un número entero."})
    tipo_historial_procesal_id: number;

    @IsDateString()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.split('T')[0];
    })
    fecha: Date;    
    
    motivo: string;

    @Length(1,1000,{message: "detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
}
