import { IsNotEmpty, Length, MaxLength } from "class-validator";

export class CreateReincidenciaDto {
    
    @MaxLength(10,{message: "id_reincidencia debe tener hasta $constraint1 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_reincidencia."})
    id_reincidencia: string;

    @Length(1,100,{message: "reincidencia debe tener entre $constraint1 y $constraint2 caracteres."})
    reincidencia: string;
}
