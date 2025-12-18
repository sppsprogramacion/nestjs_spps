import { Transform } from "class-transformer";
import { IsDateString, IsDecimal, IsInt, IsOptional, Length } from "class-validator";


export class UpdateInternoDatosPersonalesDto {
    
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

    organismo_id: number;
    
    foto: string;     
    
    fecha_carga: Date;
   
    usuario_carga_id: number;

    organismo_carga_id: number;
}
