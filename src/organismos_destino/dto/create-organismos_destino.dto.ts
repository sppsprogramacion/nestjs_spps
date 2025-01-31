import { IsInt, Length } from "class-validator";

export class CreateOrganismosDestinoDto {

    @Length(1,100,{message: "El organismo_destino debe tener entre $constraint1 y $constraint2 caracteres."})
    organismo_destino: string;

    @IsInt({message: "El organismo_depende debe ser un número entero"})
    organismo_depende: number;
}
