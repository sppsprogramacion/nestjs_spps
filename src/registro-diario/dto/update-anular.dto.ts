import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroDiarioDto } from './create-registro-diario.dto';
import { IsString, Matches, MaxLength } from 'class-validator';

export class UpdateAnularDto{

    anulado: boolean;
    
    @MaxLength(2000,{message: "El detalle_anulado debe tener hasta $constraint1 caracteres."})
    detalle_anulado: string;
    
}
