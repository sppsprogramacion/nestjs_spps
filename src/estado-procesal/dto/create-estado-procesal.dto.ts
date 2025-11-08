import { IsNotEmpty, Length, MaxLength } from "class-validator";


export class CreateEstadoProcesalDto {

    @MaxLength(10,{message: "id_estado_procesal debe tener hasta $constraint1 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_estado_procesal."})
    id_estado_procesal: string;

    @Length(2,100,{message: "El estado_procesal debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el estado_procesal."})
    estado_procesal: string;
}
