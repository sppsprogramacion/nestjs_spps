import { PartialType } from '@nestjs/mapped-types';
import { CreateDomiciliosInternoDto } from './create-domicilios-interno.dto';
import { IsInt, Length } from 'class-validator';

export class UpdateDomiciliosInternoDto {

    id_domicilio_interno: number;
    
    interno_id: number;

    @Length(1,100,{message: "pais_id debe tener entre $constraint1 y $constraint2 caracteres."})
    pais_id: string;

    @Length(1,100,{message: "provincia_id debe tener entre $constraint1 y $constraint2 caracteres."})
    provincia_id: string;

    @IsInt({message: "departamento_id debe ser un número entero"})
    departamento_id: number;

    @IsInt({message: "municipio_id debe ser un número entero"})
    municipio_id: number;

    @Length(1,100,{message: "ciudad debe tener entre $constraint1 y $constraint2 caracteres."})
    ciudad: string;

    @Length(1,100,{message: "barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    barrio: string;

    @Length(1,100,{message: "direccion debe tener entre $constraint1 y $constraint2 caracteres."})
    direccion: string;

    @IsInt({message: "numero_dom debe ser un número entero"})
    numero_dom: number;

    vigente: boolean;

    is_eliminado: boolean;
   
    detalle_eliminado: string;

    fecha_carga: Date;
    
    organismo_id: number;
        
    usuario_id: number;
}
