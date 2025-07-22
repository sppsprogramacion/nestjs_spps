import { IsNotEmpty, Length } from "class-validator";


export class CreateTamanioDto {
    @Length(1,10,{message: "El id_tamanio debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_tamanio."})
    id_tamanio: string;
    
    @Length(2,50,{message: "El tamanio debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el tamanio."})
    tamanio: string;
}
