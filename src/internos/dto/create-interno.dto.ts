import { Transform } from "class-transformer";
import { IsDateString, IsInt, IsOptional, Length } from "class-validator";


export class CreateInternoDto {
    
    codigo: string;

    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @IsInt({message: "El prontuario debe ser un número entero."})
    prontuario: number;

    @Length(1,300,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    apellido: string;

    @Length(1,300,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    nombre: string;

    @Length(1,200,{message: "El alias debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsOptional()
    alias: string;

    @IsInt({message: "sexo_id debe ser un número entero"})
    sexo_id: number;    
    
    @IsInt({message: "talla debe ser un número entero"})
    talla: number;
    
    @IsInt({message: "ojos_color_id debe ser un número entero"})
    ojos_color_id: number;
    
    @IsInt({message: "ojos_tamanio_id debe ser un número entero"})
    ojos_tamanio_id: number;
   
    @IsInt({message: "nariz_tamanio_id debe ser un número entero"})
    nariz_tamanio_id: number;
    
    @IsInt({message: "nariz_forma_id debe ser un número entero"})
    nariz_forma_id: number;
    
    @IsInt({message: "pelo_tipo_id debe ser un número entero"})
    pelo_tipo_id: number;
    
    @IsInt({message: "pelo_color_id debe ser un número entero"})
    pelo_color_id: number;

    @IsInt({message: "piel_id debe ser un número entero"})
    piel_id: number;

    @Length(1,100,{message: "La nacionalidad_id debe tener entre $constraint1 y $constraint2 caracteres."})
    nacionalidad_id: string;
        
    @Length(1,100,{message: "La provincia_nacimiento_id debe tener entre $constraint1 y $constraint2 caracteres."})
    provincia_nacimiento_id: string;
    
    @Length(1,100,{message: "La departamento_nacimiento_id debe tener entre $constraint1 y $constraint2 caracteres."})
    departamento_nacimiento_id: number;
    
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_nacimiento: Date;
        
    @IsInt({message: "El estado_civil_id debe ser un número entero"})
    estado_civil_id: number;
    
    @IsInt({message: "zona_residencia_id debe ser un número entero"})
    zona_residencia_id: number;
    
    @Length(1,200,{message: "padre debe tener entre $constraint1 y $constraint2 caracteres."})
    padre: string;
    
    @Length(1,200,{message: "madre debe tener entre $constraint1 y $constraint2 caracteres."})
    madre: string;
    
    @Length(1,500,{message: "parientes debe tener entre $constraint1 y $constraint2 caracteres."})
    parientes: string;    
    
    
    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    telefono: string;    

    organismo_id: number;
    
    foto: string;     
    
    fecha_carga: Date;
   
    usuario_carga_id: number;

    organismo_carga_id: number;
}
