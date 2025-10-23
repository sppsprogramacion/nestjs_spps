import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('ojos_tamanio')
export class OjoTamanio {
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_ojo_tamanio: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    ojo_tamanio: string
}
