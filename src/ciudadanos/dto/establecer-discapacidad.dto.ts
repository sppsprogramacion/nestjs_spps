
import { IsDateString, Length } from 'class-validator';

export class EstablecerDiscapacidadDto {
    
    @Length(1,2000,{message: "El detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    novedad_detalle:string;
}
