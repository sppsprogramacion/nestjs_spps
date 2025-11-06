import { IsNotEmpty, Length } from "class-validator";


export class CreateJurisdiccionDto {

    @Length(2,100,{message: "La jurisdiccion debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la jurisdiccion."})
    jurisdiccion: string;
}
