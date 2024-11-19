import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('nacionalidades')
export class Nacionalidad {

    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_nacionalidad: string;
    
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true
    })
    nacionalidad: string
}
