import { IsInt, Length } from "class-validator";


export class CreatePabelloneDto {

    id_pabellon: number;
    
    @Length(1,100,{message: "pabellon debe tener entre $constraint1 y $constraint2 caracteres."})
    pabellon: string;

    @IsInt({message: "organismo_id debe ser un número entero"})
    organismo_id: number;

    activo: boolean;
}
