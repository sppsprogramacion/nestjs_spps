import { Length } from "class-validator";

export class CreateConceptoDto {
    id_concepto: number;
                    
    @Length(1,100,{message: "concepto debe tener entre $constraint1 y $constraint2 caracteres."})
    concepto: string;

    activo: boolean;
}
