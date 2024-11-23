import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('organismos')
export class Organismo {
    @PrimaryGeneratedColumn()
    id_organismo: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  false
    })
    organismo: string
}
