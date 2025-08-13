import { Length } from "class-validator";

export class CreateParentescosMenoreDto {

    @Length(1,20,{message: "El id_parentesco_menor debe tener entre $constraint1 y $constraint2 caracteres."})
    id_parentesco_menor: string;

    @Length(1,100,{message: "El parentesco_menor debe tener entre $constraint1 y $constraint2 caracteres."})
    parentesco_menor: string;
}
