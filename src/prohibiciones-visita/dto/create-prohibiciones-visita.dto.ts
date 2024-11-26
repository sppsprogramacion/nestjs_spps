import { IsDateString, IsInt, Length } from "class-validator";


export class CreateProhibicionesVisitaDto {
    
    id_prohibicion_visita: number;

    @IsInt({message: "El ciudadano_id debe ser un número entero."})
    ciudadano_id: number;
    
    organismo_id: number;
    
    fecha_prohibicion: Date;

    @Length(1,100,{message: "La disposicion debe tener entre $constraint1 y $constraint2 caracteres."})
    disposicion: string;
   
    @Length(1,2000,{message: "El detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle: string;
   
    @IsDateString()
    fecha_inicio: Date;

    @IsDateString()
    fecha_fin: Date;

    vigente: boolean;

    anulado: boolean;

}
