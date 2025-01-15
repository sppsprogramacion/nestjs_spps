import { IsDateString, IsInt, Length } from "class-validator";


export class CreateCiudadanoDto {
    
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

    @Length(1,100,{message: "El pais_id debe tener entre $constraint1 y $constraint2 caracteres."})
    pais_id: string;

    @Length(1,100,{message: "El provincia_id debe tener entre $constraint1 y $constraint2 caracteres."})
    provincia_id: string;

    @IsInt({message: "El departamento_id debe ser un número entero"})
    departamento_id: number;

    @IsInt({message: "El municipio_id debe ser un número entero"})
    municipio_id: number;

    @Length(1,100,{message: "La ciudad debe tener entre $constraint1 y $constraint2 caracteres."})
    ciudad: string;

    @Length(1,100,{message: "El barrio debe tener entre $constraint1 y $constraint2 caracteres."})
    barrio: string;

    @Length(1,100,{message: "La direccion debe tener entre $constraint1 y $constraint2 caracteres."})
    direccion: string;

    @IsInt({message: "El numero_dom debe ser un número entero"})
    numero_dom: number;
    
    tiene_discapacidad: boolean;
    
    es_visita: boolean;    
    
    foto: string;     
    
    fecha_alta: Date;

    organismo_alta_id: number;
   
    usuario_id_alta: number;

    // @Matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,{message:'El formato del email no es válido'})
    // @Length(1,200,{message: "El email debe tener entre $constraint1 y $constraint2 caracteres."})
    // @IsNotEmpty({message: "Debe ingresar el email."})
    // email:string;
        

}
