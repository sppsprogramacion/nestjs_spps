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

    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @Length(1,200,{message: "alias debe tener entre $constraint1 y $constraint2 caracteres."})
    alias: string;

    @IsInt({message: "sexo_id debe ser un número entero"})
    sexo_id: number;    
    
    @IsInt({message: "talla debe ser un número entero"})
    talla: number;
    
    @Length(1,10,{message: "ojos_color_id debe tener entre $constraint1 y $constraint2 caracteres."})
    ojos_color_id: string;
    
    @Length(1,10,{message: "ojos_tamanio_id debe tener entre $constraint1 y $constraint2 caracteres."})
    ojos_tamanio_id: string;
   
    @Length(1,10,{message: "nariz_tamanio_id debe tener entre $constraint1 y $constraint2 caracteres."})
    nariz_tamanio_id: string;
    
    @Length(1,10,{message: "nariz_forma_id debe tener entre $constraint1 y $constraint2 caracteres."})
    nariz_forma_id: string;
    
    @Length(1,10,{message: "pelo_tipo_id debe tener entre $constraint1 y $constraint2 caracteres."})
    pelo_tipo_id: string;
    
    @Length(1,10,{message: "pelo_color_id debe tener entre $constraint1 y $constraint2 caracteres."})
    pelo_color_id: string;

    @Length(1,10,{message: "piel_id debe tener entre $constraint1 y $constraint2 caracteres."})
    piel_id: string;

    @Length(1,10,{message: "nacionalidad_id debe tener entre $constraint1 y $constraint2 caracteres."})
    nacionalidad_id: string;
        
    @Length(1,10,{message: "provincia_nacimiento_id debe tener entre $constraint1 y $constraint2 caracteres."})
    provincia_nacimiento_id: string;
    
    @IsInt({message: "departamento_nacimiento_id debe ser un número entero"})
    departamento_nacimiento_id: number;
    
    @IsDateString()
    @Transform(({ value }) => value.split('T')[0])
    fecha_nacimiento: Date;
        
    @IsInt({message: "estado_civil_id debe ser un número entero"})
    estado_civil_id: number;
    
    @Length(1,10,{message: "zona_residencia_id debe tener entre $constraint1 y $constraint2 caracteres."})
    zona_residencia_id: string;
    
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @Length(1,200,{message: "padre debe tener entre $constraint1 y $constraint2 caracteres."})
    padre: string;
    
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @Length(1,200,{message: "madre debe tener entre $constraint1 y $constraint2 caracteres."})
    madre: string;
    
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
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
