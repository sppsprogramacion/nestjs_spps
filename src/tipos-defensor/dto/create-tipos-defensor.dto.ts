import { Length } from "class-validator";


export class CreateTiposDefensorDto {
    @Length(1,100,{message: "El tipo_defensor debe tener entre $constraint1 y $constraint2 caracteres."})
    tipo_defensor: string;
}
