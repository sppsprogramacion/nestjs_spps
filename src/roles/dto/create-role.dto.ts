import { IsNotEmpty, Length } from "class-validator";

export class CreateRoleDto {

    @Length(2,100,{message: "El id_rol debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el id_rol."})
    id_rol: string;
    
    @Length(2,100,{message: "El rol debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el rol."})
    rol: string;

    @Length(2,20,{message: "El sistema_id debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el sistema_id."})
    sistema_id: string;


}
