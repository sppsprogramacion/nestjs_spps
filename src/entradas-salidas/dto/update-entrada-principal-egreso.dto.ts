
import { IsInt } from 'class-validator';

export class UpdateEntradaPrincipalEgresoDto {

    @IsInt({message: "ciudadano_id debe ser un número entero."})
    id_entrada_salida: number;     
               
    ciudadano_id: number;

    //ingreso principal    
    fecha_ingreso_principal: Date;
   
    hora_ingreso_principal: string;

    hora_egreso_principal: string;
    //fin ingreso principal

    observaciones_usuarios: string;
}
