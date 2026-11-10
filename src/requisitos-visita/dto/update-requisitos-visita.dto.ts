import { PartialType } from '@nestjs/mapped-types';
import { CreateRequisitoVisitaDto } from './create-requisitos-visita.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateRequisitoVisitaDto {

    @IsInt({message: "cantidad adultos principal debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar cant_adultos_principal."})
    cant_adultos_principal: number;

    @IsInt({message: "cantidad adultos secundarios debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar cant_adultos_secundarios."})
    cant_adultos_secundarios: number;

    @IsInt({message: "cantidad menores principal debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar cant_menores_principal."})
    cant_menores_principal: number;

    @IsInt({message: "cantidad menores secundarios debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar cant_menores_secundarios."})
    cant_menores_secundarios: number;   
     
}
