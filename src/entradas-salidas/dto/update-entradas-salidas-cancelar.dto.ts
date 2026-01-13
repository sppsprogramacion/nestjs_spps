
import { IsInt, IsOptional, Length } from 'class-validator';

export class UpdateEntradaSalidasCancelarDto {

    @IsInt({message: "ciudadano_id debe ser un número entero."})
    id_entrada_salida: number;     
    
    cancelado: boolean;
    
    @IsOptional()
    @Length(1,200,{message: "detalle_cancelado debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_cancelado: string;
    
    observaciones_usuarios: string;
}
