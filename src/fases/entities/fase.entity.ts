import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('fases')
export class Fase {

    @PrimaryGeneratedColumn()
    id_fase: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    fase: string

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
}
