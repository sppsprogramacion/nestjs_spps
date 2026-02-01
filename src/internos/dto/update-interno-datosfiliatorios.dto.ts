import { Transform } from "class-transformer";
import { IsDateString, IsDecimal, IsInt, IsOptional, Length } from "class-validator";


export class UpdateInternoDatosFiliatoriosDto {
    
    codigo: string;

    @Length(1,10,{message: "nacionalidad_id debe tener entre $constraint1 y $constraint2 caracteres."})
    nacionalidad_id: string;
        
    @Length(1,10,{message: "provincia_nacimiento_id debe tener entre $constraint1 y $constraint2 caracteres."})
    provincia_nacimiento_id: string;
    
    @IsInt({message: "departamento_nacimiento_id debe ser un número entero"})
    departamento_nacimiento_id: number;
    
    @Length(1,100,{message: "ciudad debe tener entre $constraint1 y $constraint2 caracteres."})
    ciudad: string;
    
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
