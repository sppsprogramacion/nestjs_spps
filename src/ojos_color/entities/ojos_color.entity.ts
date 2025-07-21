import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('ojos_color')
export class OjosColor {

    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_ojo_color: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    ojo_color: string
}
