import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('estado_civil')
export class EstadoCivil {

    @PrimaryGeneratedColumn()
    id_estado_civil: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    estado_civil: string

    @Column({
        type: 'varchar',
        length: 20,
        nullable: false,
        default: 'estado_civil'
    })
    tipo_caracteristica: string
}
