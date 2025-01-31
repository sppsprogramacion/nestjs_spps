import { IsInt, Length } from "class-validator";

export class CreateMotivosAtencionDto {

    @Length(1,100,{message: "El motivo_atencion debe tener entre $constraint1 y $constraint2 caracteres."})
    motivo_atencion: string;

    @IsInt({message: "El organismo_destino_id debe ser un número entero"})
    organismo_destino_id: number;
    
}
