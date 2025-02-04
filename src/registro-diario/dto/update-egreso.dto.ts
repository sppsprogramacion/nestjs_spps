import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroDiarioDto } from './create-registro-diario.dto';
import { IsString, Matches } from 'class-validator';

export class UpdateEgresoDto{

    
    @IsString({ message: 'La hora_egreso debe ser una cadena de texto' })
    @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, {
    message: 'La hora_egreso debe tener el formato HH:MM:SS (24 horas)',
    })
    hora_egreso: string;
    
}
