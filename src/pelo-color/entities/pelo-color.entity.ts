import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('pelo_color')
export class PeloColor {

    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_pelo_color: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    pelo_color: string
}
