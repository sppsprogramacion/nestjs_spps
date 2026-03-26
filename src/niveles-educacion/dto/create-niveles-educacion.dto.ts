import { Length } from "class-validator";

export class CreateNivelesEducacionDto {

    @Length(1,100,{message: "nivel_educacion debe tener entre $constraint1 y $constraint2 caracteres."})
    nivel_educacion: string;

}
