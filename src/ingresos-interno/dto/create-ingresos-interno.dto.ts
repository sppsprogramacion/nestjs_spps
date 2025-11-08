import { Transform } from "class-transformer";
import { IsDateString, IsInt, Length } from "class-validator";


export class CreateIngresosInternoDto {

    id_ingreso_interno: number;
    
    @IsInt({message: "interno_id debe ser un número entero."})
    interno_id: number;

    @IsInt({message: "organismo_externo_id debe ser un número entero."})
    organismo_externo_id: number;
    
    @IsInt({message: "organismo_procedencia_id debe ser un número entero."})
    organismo_procedencia_id: number;
    
    @IsInt({message: "organismo_alojamiento_id debe ser un número entero."})
    organismo_alojamiento_id: number;
    
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_alojamiento: Date;
   
    @Length(1,10,{message: "estado_procesal_id debe tener entre $constraint1 y $constraint2 caracteres."})
    estado_procesal_id: string;

    @Length(1,10,{message: "jurisdiccion_id debe tener entre $constraint1 y $constraint2 caracteres."})
    jurisdiccion_id: string;

    @Length(1,10,{message: "otra_jurisdiccion_id debe tener entre $constraint1 y $constraint2 caracteres."})
    otra_jurisdiccion_id: string;
        
    @IsInt({message: "reingreso_id debe ser un número entero."})
    reingreso_id: number;
    
    @IsInt({message: "numero_reingreso debe ser un número entero."})
    numero_reingreso: number;
   
    @Length(1,50,{message: "prontuario_policial debe tener entre $constraint1 y $constraint2 caracteres."})
    prontuario_policial: string;
    
    esta_liberado: boolean;
    
    fecha_carga: Date;
    
    organismo_carga_id: number;
    
    usuario_carga_id: number;

    eliminado: boolean;
}
