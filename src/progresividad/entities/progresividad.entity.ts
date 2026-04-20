import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('progresividad')
export class Progresividad {

    @PrimaryGeneratedColumn()
    id_progresividad: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    progresividad: string

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
}
