import { Transform } from "class-transformer";
import { IsBoolean, IsDateString, IsInt, Length } from "class-validator";


export class CreateProhibicionesAnticipadaDto {
    id_prohibicion_anticipada: number;
    
    @IsInt({message: "El dni debe ser un número entero."})
    dni_visita: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    apellido_visita: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    nombre_visita: string;

    @IsInt({message: "El sexo_id debe ser un número entero"})
    sexo_id: number; 
    
    @Length(1,2000,{message: "El detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
    
    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    apellido_interno: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    nombre_interno: string;

    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_inicio: Date;
    
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_fin: Date;
    
    @IsBoolean({message: "is_exinterno debe ser verdadero o falso"})
    is_exinterno: boolean;

    vigente: boolean;    

    tipo_levantamiento: string;
    
    fecha_prohibicion: Date;
    
    organismo_id: number;

    usuario_id: number;
}
