import { IsDateString, IsInt, IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";


export class CreateRegistroDiarioDto {

    
    id_resgistro_diario: number;      
    
    @IsInt({message: "El ciudadano_id debe ser un número entero."})
    ciudadano_id: number;    
    
    @IsInt({message: "El tipo_atencion_id debe ser un número entero."})
    tipo_atencion_id: number;    
    
    @IsInt({message: "El tipo_acceso_id debe ser un número entero."})
    tipo_acceso_id: number;
    
    @IsInt({message: "El organismo_destino_id debe ser un número entero."})
    organismo_destino_id: number;
    
    @IsInt({message: "El sector_destino_id debe ser un número entero."})
    sector_destino_id: number;
    
    @IsInt({message: "El motivo_atencion_id debe ser un número entero."})
    motivo_atencion_id: number;
    
    @IsOptional()
    @MaxLength(100,{message: "El interno debe tener hasta $constraint1 caracteres."})
    interno: string
   
    fecha_ingreso: Date;

    hora_ingreso: string;

    @IsOptional()
    @IsString({ message: 'La hora_egreso debe ser una cadena de texto' })
    @Matches(/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/, {
    message: 'La hora_egreso debe tener el formato HH:MM:SS (24 horas)',
    })
    hora_egreso: string;

    @IsOptional()
    @MaxLength(2000,{message: "El interno debe tener hasta $constraint1 caracteres."})    
    observaciones: string;

    
    anulado: boolean;

    
    organismo_id: number;
   
    
    usuario_id: number;
    
}
