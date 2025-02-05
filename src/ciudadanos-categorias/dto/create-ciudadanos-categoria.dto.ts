import { IsInt } from "class-validator";


export class CreateCiudadanosCategoriaDto {

    id_ciudadano_categoria: number;

    @IsInt({message: "El ciudadano_id debe ser un número entero."})
    ciudadano_id: number;

    @IsInt({message: "El categoria_ciudadano_id debe ser un número entero."})
    categoria_ciudadano_id: number;
    
    fecha_carga: Date;
    
    vigente: boolean;
    
    detalle_quitar_categoria: string;

    organismo_id: number;
    
    usuario_id: number;
    
}
