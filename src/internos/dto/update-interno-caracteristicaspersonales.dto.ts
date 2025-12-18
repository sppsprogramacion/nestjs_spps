import { Transform } from "class-transformer";
import { IsDateString, IsDecimal, IsInt, IsOptional, Length } from "class-validator";


export class UpdateInternoCaracteristicasPersonalesDto {
    
    codigo: string;

    @IsInt({message: "sexo_id debe ser un número entero"})
    sexo_id: number;    
    
    @IsDecimal({ decimal_digits: '1,2' },{ message: 'talla debe ser un decimal con 1 o 2 decimales' })
    talla: string;
    
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
    
    organismo_id: number;
    
    foto: string;     
    
    fecha_carga: Date;
   
    usuario_carga_id: number;

    organismo_carga_id: number;
}
