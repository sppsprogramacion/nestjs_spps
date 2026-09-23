
import { IsInt, IsOptional, Length } from 'class-validator';

export class UpdateEntradaPrincipalEgresoDto {

    id_entrada_salida: number;     
               
    ciudadano_id: number;

    //ingreso principal    
    fecha_ingreso_principal: Date;
   
    hora_ingreso_principal: string;

    hora_egreso_principal: string;
    //fin ingreso principal

    @IsOptional()
    @Length(1,200,{message: "observaciones_usuarios debe tener entre $constraint1 y $constraint2 caracteres."})
    observaciones_usuarios: string;
}
