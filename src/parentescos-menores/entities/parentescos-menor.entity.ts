import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('parentescos_menor')
export class ParentescoMenor {
    @PrimaryColumn({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true
    })
    id_parentesco_menor: String;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    parentesco_menor: string
}
