import { IsNotEmpty, Length } from "class-validator";

export class CreateSexoDto {

    @Length(2,100,{message: "El sexo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el sexo."})
    sexo: string;
}
