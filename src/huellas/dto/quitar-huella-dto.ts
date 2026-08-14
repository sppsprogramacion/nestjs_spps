import { Transform } from "class-transformer";
import { IsOptional, Length } from "class-validator";

export class QuitarHuellaDto {

    
    id_huella_ciudadano: number;
    
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
