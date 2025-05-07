import { IsInt, Length } from "class-validator";

export class CreateNovedadesCiudadanoDto {

    id_novedad_ciudadano: number;

    @IsInt({message: "El ciudadano_id debe ser un número entero."})
    ciudadano_id: number;
    
    novedad: string;
    
    @Length(1,2000,{message: "La novedad_detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    novedad_detalle: string; 
    
    fecha_novedad: Date;
    
    organismo_id: number;
    
    usuario_id: number;
    
}
