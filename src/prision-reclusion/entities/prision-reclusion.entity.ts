import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('prision_reclusion')
export class PrisionReclusion {

    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_prision_reclusion: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  true
    })
    prision_reclusion: string
}
