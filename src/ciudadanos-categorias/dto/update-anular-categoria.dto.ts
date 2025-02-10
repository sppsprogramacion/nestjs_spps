import { PartialType } from '@nestjs/mapped-types';
import { MaxLength } from 'class-validator';

export class UpdateAnularCategoriaDto{

    vigente: boolean;
    
    @MaxLength(2000,{message: "El detalle_quitar_categoria debe tener hasta $constraint1 caracteres."})
    detalle_quitar_categoria: string;
    
}
