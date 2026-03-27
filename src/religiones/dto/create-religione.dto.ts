import { Length } from "class-validator";

export class CreateReligioneDto {
    @Length(1,100,{message: "religion debe tener entre $constraint1 y $constraint2 caracteres."})
    religion: string;
}
