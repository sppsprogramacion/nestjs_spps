import { IsInt } from "class-validator";


export class UpdateInternoControlProntuarios {
    
    

    @IsInt({message: "El prontuario/numero de alcaidia debe ser un número entero."})
    numero_cambio: number;
    
}
