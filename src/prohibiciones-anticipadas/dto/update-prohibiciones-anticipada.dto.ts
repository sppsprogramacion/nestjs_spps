import { PartialType } from '@nestjs/mapped-types';
import { CreateProhibicionesAnticipadaDto } from './create-prohibiciones-anticipada.dto';
import { Length } from 'class-validator';

export class UpdateProhibicionesAnticipadaDto extends PartialType(CreateProhibicionesAnticipadaDto) {

    @Length(1,2000,{message: "El detalle_motivo debe tener entre $constraint1 y $constraint2 caracteres."})
    detalle_motivo: string;
}
