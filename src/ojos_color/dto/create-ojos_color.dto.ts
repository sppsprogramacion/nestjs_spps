import { IsNotEmpty, Length } from "class-validator";

export class CreateOjosColorDto {

    @Length(1,10,{message: "El id_ojo_color debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_ojo_color."})
    id_ojo_color: string;
    
    @Length(2,50,{message: "El ojo_color debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el ojo_color."})
    ojo_color: string;
}
