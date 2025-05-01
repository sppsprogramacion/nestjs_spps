import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, Length } from 'class-validator';

export class UpdateProhibirParentescoDto {

    id_visita_interno: number;

    prohibido: boolean;
    
    fecha_prohibido: Date;
    
    @IsDateString()
    fecha_inicio: Date;

    @IsDateString()
    fecha_fin: Date;
    
    @Length(1,2000,{message: "El detalles_prohibicion debe tener entre $constraint1 y $constraint2 caracteres."})
    detalles_prohibicion: string;
    

}
