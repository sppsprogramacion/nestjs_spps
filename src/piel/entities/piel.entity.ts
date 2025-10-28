import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('piel')
export class Piel {

    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_piel: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    piel: string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        default: 'piel'
    })
    tipo_caracteristica: string
}
