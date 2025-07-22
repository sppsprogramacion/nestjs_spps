import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('nariz_forma')
export class NarizForma {
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_nariz_forma: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    nariz_forma: string
}
