import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('sistemas')
export class Sistema {

    @PrimaryColumn({
        type: 'varchar',
        length: 20,
        nullable: false,
        unique: true
    })
    id_sistema: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    sistema: string
}
