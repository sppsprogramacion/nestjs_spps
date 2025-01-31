import { IsInt, Length } from "class-validator";

export class CreateSectoresDestinoDto {

    @Length(1,100,{message: "El sector_destino debe tener entre $constraint1 y $constraint2 caracteres."})
    sector_destino: string;

    @IsInt({message: "El organismo_destino_id debe ser un número entero"})
    organismo_destino_id: number;

}
