import { Length } from "class-validator";


export class CreateProgresividadDto {

    id_progresividad: number;
                
    @Length(1,100,{message: "progresividad debe tener entre $constraint1 y $constraint2 caracteres."})
    progresividad: string;

    activo: boolean;
}
