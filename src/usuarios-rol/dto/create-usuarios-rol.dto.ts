import { IsInt, IsNotEmpty, Length } from "class-validator";

export class CreateUsuariosRolDto {

    @IsInt({message: "El usuario_id debe ser un número entero."})
    usuario_id: number;

    @Length(2,100,{message: "El rol_id debe tener entre $constraint1 y $constraint2 caracteres."})
    @IsNotEmpty({message: "Debe ingresar el rol_id."})
    rol_id: string;

    @Length(1,1000,{message: "El detalle debe tener entre $constraint1 y $constraint2 caracteres."})
    observaciones: string;
    
    fecha_alta: Date;
    
    fecha_baja: Date;
    
    activo: boolean;
}
