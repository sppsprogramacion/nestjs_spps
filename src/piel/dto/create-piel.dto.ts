import { IsNotEmpty, Length } from "class-validator";


export class CreatePielDto {

    @Length(1,10,{message: "El id_piel debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_piel."})
    id_piel: string;
    
    @Length(2,50,{message: "El piel debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el piel."})
    piel: string;
}
