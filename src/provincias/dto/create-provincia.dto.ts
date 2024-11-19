import { IsNotEmpty, Length } from "class-validator";


export class CreateProvinciaDto {
    @Length(2,10,{message: "El id_provincia debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_provincia."})
    id_provincia: string;

    @Length(2,100,{message: "La provincia debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la provincia."})
    provincia: string;

    @Length(2,10,{message: "El pais_id debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el pais_id."})
    pais_id: string;
}
