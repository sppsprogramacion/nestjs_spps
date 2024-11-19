import { IsNotEmpty, Length } from "class-validator";

export class CreatePaiseDto {

    @Length(2,10,{message: "El id_pais debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_pais."})
    id_pais: string;
    
    @Length(2,50,{message: "El pais debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el pais."})
    pais: string;
}
