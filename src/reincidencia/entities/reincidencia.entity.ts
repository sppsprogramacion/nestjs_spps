import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('reincidencia')
export class Reincidencia {

    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_reincidencia: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  true
    })
    reincidencia: string
}
