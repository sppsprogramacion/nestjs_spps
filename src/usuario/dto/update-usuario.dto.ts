import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    
    @IsNotEmpty({message: "property clave should not exist"})  
    @IsEmpty({message: "property clave should not exist"})
    clave: string;
}
