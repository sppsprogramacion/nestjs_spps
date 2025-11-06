import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('reingreso')
export class Reingreso {
    @PrimaryGeneratedColumn()
    id_reingreso: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  false
    })
    reingreso: string
}
