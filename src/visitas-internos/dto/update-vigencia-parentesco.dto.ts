import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, Length } from 'class-validator';

export class UpdateVigenciaParentescoDto {

    id_visita_interno: number;

    vigente: boolean;
    
    @Length(1,1500,{message: "El detalles_vigencia debe tener entre $constraint1 y $constraint2 caracteres."})
    detalles_vigencia: string;
    

}
