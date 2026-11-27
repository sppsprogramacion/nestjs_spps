import { Transform } from "class-transformer";
import { IsDateString, IsInt } from "class-validator";


export class EstablecerConductaConceptoDto {
    
    @IsInt({message: "trimestre_id debe ser un número entero."})
    trimestre_id: number;

    @IsInt({message: "conducta_id debe ser un número entero."})
    conducta_id: number;

    @IsInt({message: "concepto_id debe ser un número entero."})
    concepto_id: number;

    //para el historial procesal
    @IsDateString()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.split('T')[0];
    })
    fecha: Date;     
}