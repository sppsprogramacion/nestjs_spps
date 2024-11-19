import { IsInt, IsNotEmpty, Length } from "class-validator";


export class LoginCiudadanoDto {

    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @IsNotEmpty({message: "Debe ingresar la clave."})
    clave: string;
}