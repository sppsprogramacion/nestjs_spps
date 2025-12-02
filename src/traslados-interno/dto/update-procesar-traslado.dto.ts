import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

export class UpdateProcesarTrasladoDto {
        
    @Length(1,1500,{message: "obs_traslado debe tener entre $constraint1 y $constraint2 caracteres."})
    obs_traslado: string;
}
