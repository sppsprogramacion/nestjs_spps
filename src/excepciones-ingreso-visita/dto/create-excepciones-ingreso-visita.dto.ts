import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsDateString, IsInt, Length } from "class-validator";


export class CreateExcepcionIngresoVisitaDto {

    id_excepcion_ingreso_visita: number;
    
    @IsInt({message: "El ciudadano_id debe ser un número entero."})
    ciudadano_id: number;

    @IsInt({message: "El interno_id debe ser un número entero."})
    interno_id: number;
    
    @Length(1,200,{message: "El motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    motivo: string;
    
    @Length(1,1000,{message: "El detalle_excepcion debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_excepcion: string;
    
    
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_excepcion: Date;
    
    @IsBoolean()
    es_visita_ordinaria: boolean;

    cumplimentado: boolean;

    controlado: boolean;
    
    anulado: boolean;
        
    fecha_carga: Date;

    organismo_id: number;

    usuario_carga_id: number;
}
