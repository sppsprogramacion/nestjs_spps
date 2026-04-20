import { Length } from "class-validator";


export class CreateFaseDto {

    id_fase: number;
                    
    @Length(1,100,{message: "fase debe tener entre $constraint1 y $constraint2 caracteres."})
    fase: string;

    activo: boolean;
}
