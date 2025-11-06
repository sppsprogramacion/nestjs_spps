import { IsNotEmpty, Length } from "class-validator";


export class CreateOrganismosExternoDto {

    @Length(2,100,{message: "El organismo_externo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el organismo_externo."})
    organismo_externo: string;
}
