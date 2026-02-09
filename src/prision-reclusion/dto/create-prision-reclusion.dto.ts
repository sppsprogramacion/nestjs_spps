import { IsNotEmpty, Length, MaxLength } from "class-validator";

export class CreatePrisionReclusionDto {

    @MaxLength(10,{message: "id_prision_reclusion debe tener hasta $constraint1 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_prision_reclusion."})
    id_prision_reclusion: string;

    @Length(1,100,{message: "prision_reclusion debe tener entre $constraint1 y $constraint2 caracteres."})
    prision_reclusion: string;
}
