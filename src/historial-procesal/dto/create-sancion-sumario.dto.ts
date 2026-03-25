import { Transform } from "class-transformer";
import { IsDateString, IsInt, Length } from "class-validator";

export class CreateSancionSumarioDto {

    id_historial_procesal: number;
    
    @IsInt({message: "ingreso_interno_id debe ser un número entero."})
    ingreso_interno_id: number;
    
    tipo_historial_procesal_id: number;

    @IsDateString()
    @Transform(({ value }) => {
        if (typeof value !== 'string') return value;
        return value.split('T')[0];
    })
    fecha: Date;    
    
    motivo: string;

    @Length(1,1000,{message: "motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
        
    is_eliminado: boolean;
   
    detalle_eliminado: string;
    
    fecha_carga: Date;
    
    organismo_id: number;

    usuario_id: number;

}
