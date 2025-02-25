import { PartialType } from '@nestjs/mapped-types';
import { CreateMenoresACargoDto } from './create-menores_a_cargo.dto';
import { MaxLength } from 'class-validator';

export class UpdateAnularMenorCargoDto{
    
    anulado: boolean;
        
    @MaxLength(2000,{message: "El detalle_anular debe tener hasta $constraint1 caracteres."})
    detalle_anular: string;
}
