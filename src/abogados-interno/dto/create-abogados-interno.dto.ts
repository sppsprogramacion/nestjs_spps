import { IsInt } from "class-validator";

export class CreateAbogadosInternoDto {

    id_abogado_interno: number;

    @IsInt({message: "El ciudadano_id debe ser un número entero."})
    ciudadano_id: number;

    @IsInt({message: "El interno_id debe ser un número entero."})
    interno_id: number;
    
    @IsInt({message: "El tipo_defensor_id debe ser un número entero."})
    tipo_defensor_id

    fecha_carga: Date;
    
    vigente: boolean;
    
    detalle_quitar_vigente: string;

    organismo_id: number;
    
    usuario_id: number;
}
