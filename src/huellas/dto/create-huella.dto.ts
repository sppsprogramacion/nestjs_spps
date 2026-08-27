import { Transform } from "class-transformer";
import { IsByteLength, IsInt, IsNotEmpty, IsOptional, Length } from "class-validator";


export class CreateHuellaDto {

    
    id_huella_ciudadano: number;
    
    @IsInt({message: "ciudadano_id debe ser un número entero."})
    ciudadano_id: number;

    @IsInt({message: "dedo_id debe ser un número entero."})
    dedo_id: number;    
    
    @IsNotEmpty({message: 'La huella es obligatoria.'})
    @IsByteLength(1, 16777215, {message: 'La huella contiene una cantidad de bytes no válida.'})
    huella: Buffer;
    
    activo: boolean;       
    
    fecha_registro: Date;
    
    fecha_modificacion: Date;
    
    @Transform(({ value }) => value === '' ? undefined : value)
    @IsOptional()
    @Length(1,500,{message: "detalle_motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_motivo: string;
    
    organismo_id: number;

    usuario_id: number;

}
