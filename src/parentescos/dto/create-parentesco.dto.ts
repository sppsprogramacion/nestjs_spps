import { Length } from "class-validator";


export class CreateParentescoDto {

    @Length(1,20,{message: "El id_parentesco debe tener entre $constraint1 y $constraint2 caracteres."})
    id_parentesco: string;

    @Length(1,100,{message: "El parentesco debe tener entre $constraint1 y $constraint2 caracteres."})
    parentesco: string;
    
}
