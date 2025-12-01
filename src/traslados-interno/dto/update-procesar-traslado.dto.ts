
import { Transform } from 'class-transformer';
import { IsDateString, Length, MaxLength } from 'class-validator';

export class UpdateProcesarTrasladoDto {
        
    @MaxLength(1500,{message: "obs_traslado debe tener hasta $constraint1 caracteres."})
    obs_traslado: string;
}
