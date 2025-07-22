import { IsNotEmpty, Length } from "class-validator";


export class CreatePeloColorDto {

    @Length(1,10,{message: "El id_pelo_color debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_pelo_color."})
    id_pelo_color: string;
    
    @Length(2,50,{message: "El pelo_color debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el pelo_color."})
    pelo_color: string;
}
