import { Progresividad } from "src/progresividad/entities/progresividad.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    //PROGRESIVIDAD
    @Column({
        type: 'int',
        nullable: false,
        default: 1
    })
    progresividad_id: number;

    @ManyToOne(type => Progresividad, {eager: true} )
    @JoinColumn({
        name: 'progresividad_id',
        referencedColumnName: 'id_progresividad'
    })
    progresividad: Progresividad;
    //FIN PROGRESIVIDAD
}
