import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tipos_defensor')
export class TipoDefensor {

    @PrimaryGeneratedColumn()
    id_tipo_defensor: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    tipo_defensor: string
}
