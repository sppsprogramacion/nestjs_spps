import { IsInt, IsNotEmpty } from "class-validator";

export class CreateRequisitoVisitaDto {

    @IsInt({message: "cantidad adultos principal debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar cant_adultos_principal."})
    cant_adultos_principal: number;

    @IsInt({message: "cantidad adultos secundarios debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar cant_adultos_secundarios."})
    cant_adultos_secundarios: number;

    @IsInt({message: "cantidad menores principal debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar cant_menores_principal."})
    cant_menores_principal: number;

    @IsInt({message: "cantidad menores secundarios debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar cant_menores_secundarios."})
    cant_menores_secundarios: number;    
    
    @IsInt({message: "El organismo_id debe ser un número entero"})
    @IsNotEmpty({message: "Debe ingresar el organismo_id."})
    organismo_id: number;
}
