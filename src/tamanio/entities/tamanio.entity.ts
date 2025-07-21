import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('tamanio')
export class Tamanio {

    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_tamanio: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    tamanio: string
}
