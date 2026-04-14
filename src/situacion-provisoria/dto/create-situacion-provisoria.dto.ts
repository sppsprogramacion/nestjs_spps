import { Length } from "class-validator";

export class CreateSituacionProvisoriaDto {
    id_situacion_provisoria: number;
        
    @Length(1,100,{message: "situacion_provisoria debe tener entre $constraint1 y $constraint2 caracteres."})
    situacion_provisoria: string;

    activo: boolean;
}
