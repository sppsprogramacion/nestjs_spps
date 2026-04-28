import { Length } from "class-validator";


export class CreateMotivosEgresoDto {
    
    id_motivo_egreso: number;
                        
    @Length(1,100,{message: "motivo_egreso debe tener entre $constraint1 y $constraint2 caracteres."})
    motivo_egreso: string;

    activo: boolean;
}
