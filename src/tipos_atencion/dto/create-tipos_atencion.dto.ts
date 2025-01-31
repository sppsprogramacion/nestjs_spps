import { Length } from "class-validator";

export class CreateTiposAtencionDto {

    @Length(1,100,{message: "El tipo_atencion debe tener entre $constraint1 y $constraint2 caracteres."})
    tipo_atencion: string;
}
