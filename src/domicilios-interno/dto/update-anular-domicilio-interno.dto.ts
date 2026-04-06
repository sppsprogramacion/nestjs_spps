import { Length } from "class-validator";


export class UpdateAnularDomicilioInternoDto {
        
    @Length(1,200,{message: "detalle_eliminado debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_eliminado: string;
}