import { IsInt } from "class-validator";


export class CreateBitacoraProhibicionesVisitaDto {

    @IsInt({message: "El prohibicion_visita_id debe ser un número entero."})
    prohibicion_visita_id: number;
    
    disposicion: string;
       
    detalle: string;   
   
    fecha_inicio: Date;
    
    fecha_fin: Date;

    vigente: boolean;
 
    anulado: boolean;

    motivo: string;
        
    detalle_motivo: string;
    
    organismo_id: number;

    usuario_id: number;

    fecha_cambio: Date;

        
}
