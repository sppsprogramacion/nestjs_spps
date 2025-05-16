import { IsDateString, IsInt, Length } from "class-validator";


export class CreateProhibicionesAnticipadaDto {
    id_prohibicion_visita: number;
    
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

    @Length(1,20,{message: "El parentesco_id debe tener entre $constraint1 y $constraint2 caracteres."})
    parentesco_id: string;

    @IsDateString()
    fecha_inicio: Date;
    
    @IsDateString()
    fecha_fin: Date;
        
    is_exinterno: boolean;

    vigente: boolean;    
    
    fecha_prohibicion: Date;
    
    organismo_id: number;

    usuario_id: number;
}
