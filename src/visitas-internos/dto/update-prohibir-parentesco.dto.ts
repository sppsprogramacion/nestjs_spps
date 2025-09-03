import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsDateString, Length } from 'class-validator';

export class UpdateProhibirParentescoDto {

    id_visita_interno: number;

    prohibido: boolean;
    
    fecha_prohibido: Date;
    
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_inicio: Date;

    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_fin: Date;
    
    @Length(1,1500,{message: "El detalles_prohibicion debe tener entre $constraint1 y $constraint2 caracteres."})
    detalles_prohibicion: string;
    

}
