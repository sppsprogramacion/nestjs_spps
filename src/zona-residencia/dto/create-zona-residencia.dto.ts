import { IsNotEmpty, Length } from "class-validator";

export class CreateZonaResidenciaDto {

    @Length(1,10,{message: "El id_zona_residencia debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_zona_residencia."})
    id_zona_residencia: string;
    
    @Length(2,100,{message: "La zona_residencia debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la zona_residencia."})
    zona_residencia: string;
}
