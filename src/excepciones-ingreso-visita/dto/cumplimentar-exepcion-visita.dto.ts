
import { IsDateString, Length } from 'class-validator';

export class CumplimentarExepcionDto {

    @Length(1,500,{message: "El detalle_cumplimentado debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_cambio:string;
}
