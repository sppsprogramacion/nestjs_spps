import { Length } from "class-validator";

export class CreateDedosHuellaDto {

    @Length(1,100,{message: "dedo_huella debe tener entre $constraint1 y $constraint2 caracteres."})
    dedo_huella: string;
}
