import { Transform } from "class-transformer";
import { IsByteLength, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";


export class CreateHuellaDto {

    
    id_huella_ciudadano: number;
    
    @IsInt({message: "ciudadano_id debe ser un número entero."})
    @IsNotEmpty()
    ciudadano_id: number;

    @IsInt({message: "dedo_id debe ser un número entero."})
    @IsNotEmpty()
    dedo_id: number;    
    
    @IsString({
        message: 'huella debe ser una cadena Base64.',
    })
    @IsNotEmpty({
        message: 'huella es obligatoria.',
    })
    @Matches(
        /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,
        {
            message: 'huella debe contener un valor Base64 válido.',
        },
    )
    huella: string;
    
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
