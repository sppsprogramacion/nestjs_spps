import { IsNotEmpty, Length } from "class-validator";


export class CreateEstadoCivilDto {
    @Length(2,100,{message: "El estado_civil debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el estado_civil."})
    estado_civil: string;
}
