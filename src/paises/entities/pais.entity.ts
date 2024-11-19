import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('paises')
export class Pais {
    @PrimaryColumn({
        type: 'varchar',
        length: 10,
        nullable: false,
        unique: true
    })
    id_pais: string;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    pais: string
}
