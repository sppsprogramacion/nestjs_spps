
import { Type } from 'class-transformer';
import { IsDate, IsDateString, Length } from 'class-validator';

export class UpdateLevantarProhibicionParentescoDto {
    
    @Type(() => Date)
    @IsDate()
    fecha_fin: Date;

    @Length(1,2000,{message: "El detalle_levantamiento debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_levantamiento:string;
}
