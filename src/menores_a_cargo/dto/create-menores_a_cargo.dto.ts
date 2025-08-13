import { IsInt, Length } from "class-validator";


export class CreateMenoresACargoDto {

    id_menor_a_cargo: number;
    
    @IsInt({message: "El ciudadano_tutor_id debe ser un número entero."})
    ciudadano_tutor_id: number;

    @IsInt({message: "El ciudadano_menor_id debe ser un número entero."})
    ciudadano_menor_id: number;
    
    @Length(1,20,{message: "El parentesco_menor_id debe tener entre $constraint1 y $constraint2 caracteres."})
    parentesco_menor_id

    fecha_carga: Date;
    
    anulado: boolean;
    
    detalle_anular: string;

    organismo_id: number;
    
    usuario_id: number;
}
