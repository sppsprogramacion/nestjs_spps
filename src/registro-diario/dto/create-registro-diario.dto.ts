import { IsDateString, IsInt, IsOptional, IsString, Length, Matches, MaxLength } from "class-validator";


export class CreateRegistroDiarioDto {

    
    id_resgistro_diario: number;      
    
    @IsInt({message: "El ciudadano_id debe ser un número entero."})
    ciudadano_id: number;    
    
    @IsInt({message: "El tipo_atencion_id debe ser un número entero."})
    tipo_atencion_id: number;    
    
    @IsInt({message: "El tipo_acceso_id debe ser un número entero."})
    tipo_acceso_id: number;
    
    @IsInt({message: "El sector_destino_id debe ser un número entero."})
    sector_destino_id: number;
    
    @IsInt({message: "El motivo_atencion_id debe ser un número entero."})
    motivo_atencion_id: number;
    
    @IsOptional()
    @MaxLength(200,{message: "El interno debe tener hasta $constraint1 caracteres."})
    interno: string
   
    fecha_ingreso: Date;

    hora_ingreso: string;

    @IsOptional()
    @MaxLength(20000,{message: "Las observaciones tener hasta $constraint1 caracteres."})    
    observaciones: string;
    
    anulado: boolean;
    
    organismo_id: number;
    
    usuario_id: number;
    
}
