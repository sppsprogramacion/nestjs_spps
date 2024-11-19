import { IsInt, IsNotEmpty, Length } from "class-validator";

export class CreateDepartamentoDto {
    
    @Length(2,100,{message: "El departamento debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el departamento."})
    departamento: string;

    @Length(2,10,{message: "El provincia_id debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el provincia_id."})
    provincia_id: string;
}
