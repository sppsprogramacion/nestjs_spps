import { IsNotEmpty, Length } from "class-validator";


export class CreateNacionalidadeDto {
    
    @Length(2,10,{message: "El id_nacionalidad debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_nacionalidad."})
    id_nacionalidad: string;

    @Length(1,100,{message: "El nacionalidad debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nacionalidad."})
    nacionalidad: string
}
