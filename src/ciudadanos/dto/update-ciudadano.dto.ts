import { PartialType } from '@nestjs/mapped-types';
import { CreateCiudadanoDto } from './create-ciudadano.dto';
import { Length } from 'class-validator';

export class UpdateCiudadanoDto extends PartialType(CreateCiudadanoDto) {    
    
    @Length(1,2000,{message: "El detalle_motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_motivo: string;    
}
