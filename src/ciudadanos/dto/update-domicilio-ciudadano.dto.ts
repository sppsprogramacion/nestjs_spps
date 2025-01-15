import { IsInt, Length } from "class-validator";

export class UpdateDomicilioCiudadanoDto {
        
    @Length(1,100,{message: "El pais_id debe tener entre $constraint1 y $constraint2 caracteres."})
    pais_id: string;

    @Length(1,100,{message: "El provincia_id debe tener entre $constraint1 y $constraint2 caracteres."})
    provincia_id: string;

    @IsInt({message: "El departamento_id debe ser un número entero"})
    departamento_id: number;

    @IsInt({message: "El municipio_id debe ser un número entero"})
    municipio_id: number;

    @Length(1,100,{message: "La ciudad debe tener entre $constraint1 y $constraint2 caracteres."})
    ciudad: string;

    @Length(1,100,{message: "El barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    barrio: string;

    @Length(1,100,{message: "La direccion debe tener entre $constraint1 y $constraint2 caracteres."})
    direccion: string;

    @IsInt({message: "El numero_dom debe ser un número entero"})
    numero_dom: number;
}