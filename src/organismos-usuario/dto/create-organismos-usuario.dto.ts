import { IsNotEmpty, Length } from "class-validator";


export class CreateOrganismosUsuarioDto {
    
    @Length(2,100,{message: "El organismo_usuario debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el organismo_usuario."})
    organismo_usuario: string;
}
