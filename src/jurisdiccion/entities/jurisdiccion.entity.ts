import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('jurisdiccion')
export class Jurisdiccion {

    @PrimaryGeneratedColumn()
    id_jurisdiccion: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  false
    })
    jurisdiccion: string
}
