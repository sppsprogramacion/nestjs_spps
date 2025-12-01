import { Transform } from "class-transformer";
import { IsDateString, IsInt, Length } from "class-validator";

export class CreateTrasladosInternoDto {
   
    id_traslado_interno: number;    
    
    @IsInt({message: "ingreso_interno_id debe ser un número entero."})
    ingreso_interno_id: number;

    
    organismo_origen_id: number;
    
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_egreso_origen: Date;

    @Length(1,1500,{message: "detalle_traslado debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_traslado: string;
    
    @IsInt({message: "organismo_destino_id debe ser un número entero."})
    organismo_destino_id: number;
        
    fecha_ingreso_destino: Date;
    
    estado_traslado: string;

    obs_traslado: string;
        
    fecha_carga: Date;

    hora_carga: string;
        
    usuario_id: number;
    
}
