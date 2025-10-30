import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('zona_residencia')
export class ZonaResidencia {
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_zona_residencia: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    zona_residencia: string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        default: 'zona_residencia'
    })
    tipo_caracteristica: string

}
