import { IsNotEmpty, Length } from "class-validator";

export class CreatePeloTipoDto {

    @Length(1,10,{message: "El id_pelo_tipo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_pelo_tipo."})
    id_pelo_tipo: string;
    
    @Length(2,50,{message: "El pelo_tipo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el pelo_tipo."})
    pelo_tipo: string;
}
