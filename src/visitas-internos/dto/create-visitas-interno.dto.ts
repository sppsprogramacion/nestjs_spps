import { IsInt, Length } from "class-validator";

export class CreateVisitasInternoDto {

    //id_visita_interno: number;
    
    @IsInt({message: "El ciudadano_id debe ser un número entero."})
    ciudadano_id: number;

    @IsInt({message: "El interno_id debe ser un número entero."})
    interno_id: number;

    @Length(1,20,{message: "El parentesco_id debe tener entre $constraint1 y $constraint2 caracteres."})
    parentesco_id: string;       
    
    prohibido: boolean;
    
    vigente: boolean;

    anulado: boolean;
    
    fecha_alta: Date;

    usuario_id: number;
}
