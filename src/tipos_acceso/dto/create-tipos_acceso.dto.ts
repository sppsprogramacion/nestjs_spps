import { Length } from "class-validator";

export class CreateTiposAccesoDto {
    
    @Length(1,100,{message: "El tipo_acceso debe tener entre $constraint1 y $constraint2 caracteres."})
    tipo_acceso: string;
}
