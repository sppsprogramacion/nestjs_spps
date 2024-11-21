import { Column, PrimaryGeneratedColumn } from "typeorm";

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
