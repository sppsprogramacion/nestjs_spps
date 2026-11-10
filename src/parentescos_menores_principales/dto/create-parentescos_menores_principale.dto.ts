import { Length } from "class-validator";


export class CreateParentescosMenoresPrincipaleDto {

    id_parentesco_menor_principal: number;
    
    @Length(1,20,{message: "El parentesco_id debe tener entre $constraint1 y $constraint2 caracteres."})
    parentesco_id: string;

    organismo_id: number;
    
    vigente: boolean;
    
    fecha_alta: Date;

    fecha_baja: Date;
    
    detalles: string;
}
