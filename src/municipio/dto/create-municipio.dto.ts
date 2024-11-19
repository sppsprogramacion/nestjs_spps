import { IsInt, IsNotEmpty, Length } from "class-validator";

export class CreateMunicipioDto {

    @Length(2,100,{message: "El municipio debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el municipio."})
    municipio: string;

    @IsInt({message: "El departamento_id debe ser un número entero"})
    departamento_id: number;
}
