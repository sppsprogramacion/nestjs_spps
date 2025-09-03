import { Transform } from "class-transformer";
import { IsDateString, IsInt, Length } from "class-validator";


export class CreateInternoDto {
    
    codigo: string;

    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @IsInt({message: "El prontuario debe ser un número entero."})
    prontuario: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    nombre: string;

    @IsInt({message: "El sexo_id debe ser un número entero"})
    sexo_id: number;    
    
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_nacimiento: Date;
    
    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    telefono: string;

    @IsInt({message: "El estado_civil_id debe ser un número entero"})
    estado_civil_id: number;
    
    @Length(1,100,{message: "La nacionalidad_id debe tener entre $constraint1 y $constraint2 caracteres."})
    nacionalidad_id: string;

    organismo_id: number;
    
    foto: string;     
    
    fecha_carga: Date;
   
    usuario_carga_id: number;

    organismo_carga_id: number;
}
