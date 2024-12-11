import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('parentescos')
export class Parentesco {

    @PrimaryColumn({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true
    })
    id_parentesco: String;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    parentesco: string
    
}
