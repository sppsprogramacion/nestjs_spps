import { IsInt, IsNotEmpty, Length } from "class-validator";


export class LoginUsuarioDto {

    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @Length(8,16,{message: "La clave debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la clave."})
    clave: string;
}