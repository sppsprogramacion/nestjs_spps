import { PartialType } from '@nestjs/mapped-types';
import { MaxLength } from 'class-validator';

export class UpdateQuitarVigenteDto{

    vigente: boolean;
    
    @MaxLength(2000,{message: "El detalle_quitar_vigente debe tener hasta $constraint1 caracteres."})
    detalle_quitar_vigente: string;
    
}
