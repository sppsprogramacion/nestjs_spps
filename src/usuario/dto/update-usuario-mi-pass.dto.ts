import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class UpdateUsuarioMiPassDto {
    
    @IsNotEmpty({message: "Debe ingresar la clave."})
    clave_actual: string;

    @IsString()
    @Length(8,16,{message: "La clave debe tener entre $constraint1 y $constraint2 caracteres."})
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La clave debe tener una Mayuscula, una minuscula  y un número'
    })
    clave: string;
    
}
