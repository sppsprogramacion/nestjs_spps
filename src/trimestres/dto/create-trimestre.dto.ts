import { Length } from "class-validator";

export class CreateTrimestreDto {
    id_trimestre: number;
            
    @Length(1,100,{message: "trimestre debe tener entre $constraint1 y $constraint2 caracteres."})
    trimestre: string;

    activo: boolean;
}
