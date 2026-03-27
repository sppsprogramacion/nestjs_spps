import { Length } from "class-validator";


export class CreateOcupacioneDto {
    @Length(1,100,{message: "ocupacion debe tener entre $constraint1 y $constraint2 caracteres."})
    ocupacion: string;
}
