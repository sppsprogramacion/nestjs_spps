import { IsInt } from "class-validator";


export class CreateMenoresACargoDto {

    id_menor_a_cargo: number;
    
    @IsInt({message: "El ciudadano_tutor_id debe ser un número entero."})
    ciudadano_tutor_id: number;

    @IsInt({message: "El ciudadano_menor_id debe ser un número entero."})
    ciudadano_menor_id: number;
    
    @IsInt({message: "El parentesco_id debe ser un número entero."})
    parentesco_id

    fecha_carga: Date;
    
    anulado: boolean;
    
    detalle_anular: string;

    organismo_id: number;
    
    usuario_id: number;
}
