
import { IsDateString, Length } from 'class-validator';

export class UpdateLevantarProhibicionParentescoDto {
        
    @Length(1,2000,{message: "El detalle_levantamiento debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_levantamiento:string;
}
