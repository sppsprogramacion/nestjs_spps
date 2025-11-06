import { IsNotEmpty, Length } from "class-validator";


export class CreateEstadoProcesalDto {

    @Length(2,100,{message: "El estado_procesal debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el estado_procesal."})
    estado_procesal: string;
}
