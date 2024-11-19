import { IsDateString, IsInt, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class CreateUsuarioDto {

    @IsInt({message: "El dni debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el dni."})
    dni: number;

    @IsInt({message: "El legajo debe ser un número entero."})
    @IsNotEmpty({message: "Debe ingresar el legajo."})
    legajo: number;
    
    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el apellido."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el nombre."})
    nombre: string;

    @IsInt({message: "El sexo_id debe ser un número entero"})
    @IsNotEmpty({message: "Debe ingresar el sexo_id."})
    sexo_id: number;

    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el teléfono."})
    telefono: string;

    @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido.'})
    @Length(1,200,{message: "El email debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el email."})
    email: string;

    @IsString()
    @Length(8,16,{message: "La clave debe tener entre $constraint1 y $constraint2 caracteres."})
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'La clave debe tener una Mayuscula, una minuscula  y un número'
    })
    clave: string;
}
