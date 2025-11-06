import { IsNotEmpty, Length } from "class-validator";

export class CreateOrganismoDto {
    
    @Length(2,100,{message: "El organismo debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el organismo."})
    organismo: string;
}
