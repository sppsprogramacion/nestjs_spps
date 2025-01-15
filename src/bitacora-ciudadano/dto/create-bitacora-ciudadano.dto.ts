import { IsDateString, IsInt, Length } from "class-validator";

export class CreateBitacoraCiudadanoDto {

    ciudadano_id: number;

    dni: number;
    
    apellido: string;

    nombre: string;
    
    sexo_id: number;    
    
    fecha_nac: Date;
    
    telefono: string;

    estado_civil_id: number;
    
    nacionalidad_id: string;

    motivo: string;
        
    detalle_motivo: string;
   
    organismo_id: number;

    usuario_id: number;

    fecha_cambio: Date;
}

