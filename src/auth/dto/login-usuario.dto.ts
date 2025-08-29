import { IsInt, IsNotEmpty, Length } from "class-validator";


export class LoginUsuarioDto {

    @IsNotEmpty({message: "Debe ingresar el usuario."})
    dni: number;

    //@Length(8,16,{message: "La clave debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar la clave."})
    clave: string;
}