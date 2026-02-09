import { Length } from "class-validator";


export class CreateTipoDelitoDto {
    
    @Length(1,100,{message: "tipo_delito debe tener entre $constraint1 y $constraint2 caracteres."})
    tipo_delito: string;
}
