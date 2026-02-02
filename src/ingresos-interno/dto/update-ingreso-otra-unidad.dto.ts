import { Transform } from "class-transformer";
import { IsDateString, IsInt, IsOptional, Length } from "class-validator";

export class UpdateIngresoOtraUnidadDto {

    id_ingreso_interno: number;    
    
    organismo_procedencia_id: number;    

    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @Length(1,200,{message: "obs_organismo_procedencia debe tener entre $constraint1 y $constraint2 caracteres."})
    obs_organismo_procedencia: string;
    
    organismo_alojamiento_id: number;
    
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_alojamiento: Date;
          
}
