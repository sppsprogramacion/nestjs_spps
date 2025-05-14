
import { IsDateString, Length } from 'class-validator';

export class AnularExepcionDto {

    @Length(1,500,{message: "El detalle_anulado debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_cambio:string;
}
