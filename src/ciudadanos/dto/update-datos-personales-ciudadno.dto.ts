import { IsDateString, IsInt, Length } from "class-validator";


export class UpdateDatosPersonalesCiudadanoDto {
    
    @IsInt({message: "El dni debe ser un número entero."})
    dni: number;

    @Length(1,100,{message: "El apellido debe tener entre $constraint1 y $constraint2 caracteres."})
    apellido: string;

    @Length(1,100,{message: "El nombre debe tener entre $constraint1 y $constraint2 caracteres."})
    nombre: string;

    @IsInt({message: "El sexo_id debe ser un número entero"})
    sexo_id: number;    
    
    @IsDateString()
    fecha_nac: Date;
    
    @Length(1,100,{message: "El teléfono debe tener entre $constraint1 y $constraint2 caracteres."})
    telefono: string;

    @IsInt({message: "El estado_civil_id debe ser un número entero"})
    estado_civil_id: number;
    
    @Length(1,100,{message: "La nacionalidad_id debe tener entre $constraint1 y $constraint2 caracteres."})
    nacionalidad_id: string;

}