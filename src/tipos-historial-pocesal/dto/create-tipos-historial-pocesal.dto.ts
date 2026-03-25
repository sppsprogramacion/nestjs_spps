import { Length } from "class-validator";

export class CreateTiposHistorialPocesalDto {

    @Length(1,100,{message: "tipo_historial_procesal debe tener entre $constraint1 y $constraint2 caracteres."})
    tipo_historial_procesal: string;
}
