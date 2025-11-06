import { IsNotEmpty, Length } from "class-validator";


export class CreateReingresoDto {
    
    @Length(2,100,{message: "El reingreso debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el reingreso."})
    reingreso: string;
}
