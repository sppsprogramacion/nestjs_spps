import { Length } from "class-validator";

export class CreateCategoriasCiudadanoDto {

    @Length(1,100,{message: "El categoria_ciudadano debe tener entre $constraint1 y $constraint2 caracteres."})
    categoria_ciudadano: string;
}
