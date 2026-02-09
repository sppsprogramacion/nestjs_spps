import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, Length, MaxLength } from "class-validator";

export class CreateJuzgadoDto {

    @MaxLength(10,{message: "id_juzgado debe tener hasta $constraint1 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_juzgado."})
    id_juzgado: string;

    @Length(1,100,{message: "juzgado debe tener entre $constraint1 y $constraint2 caracteres."})
    juzgado: string;

    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @Length(1,200,{message: "descripcion_organismo_oficial debe tener entre $constraint1 y $constraint2 caracteres."})
    descripcion_organismo_oficial: string;
}
