import { IsNotEmpty, Length, MaxLength } from "class-validator";


export class CreateJurisdiccionDto {

    @MaxLength(10,{message: "id_jurisdiccion debe tener hasta $constraint1 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_jurisdiccion."})
    id_jurisdiccion: string;

    @Length(2,100,{message: "La jurisdiccion debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la jurisdiccion."})
    jurisdiccion: string;
}


