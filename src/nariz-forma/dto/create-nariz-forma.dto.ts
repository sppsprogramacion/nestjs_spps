import { IsNotEmpty, Length } from "class-validator";

export class CreateNarizFormaDto {
    @Length(1,10,{message: "El id_nariz_forma debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_nariz_forma."})
    id_nariz_forma: string;
    
    @Length(2,50,{message: "La nariz_forma debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la nariz_forma."})
    nariz_forma: string;
}
