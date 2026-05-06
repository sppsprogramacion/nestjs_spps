import { IsInt } from "class-validator";


export class EstablecerConductaConceptoDto {
    
    @IsInt({message: "trimestre_id debe ser un número entero."})
    trimestre_id: number;

    @IsInt({message: "conducta_id debe ser un número entero."})
    conducta_id: number;

    @IsInt({message: "concepto_id debe ser un número entero."})
    concepto_id: number;
}