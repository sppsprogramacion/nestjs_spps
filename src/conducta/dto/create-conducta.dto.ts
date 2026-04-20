import { Length } from "class-validator";


export class CreateConductaDto {
    id_conducta: number;
                
    @Length(1,100,{message: "conducta debe tener entre $constraint1 y $constraint2 caracteres."})
    conducta: string;

    activo: boolean;
}
