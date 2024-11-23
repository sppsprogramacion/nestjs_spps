import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('prohibiciones-visita')
export class ProhibicionVisita {
    
    @PrimaryGeneratedColumn()
    id_prohibicion_visita: number;

    //CIUDADANO
    @Column({
        type: 'int',
        nullable: false
    })
    ciudadano_id: number;

    @ManyToOne(type => Ciudadano, {eager: true} )
    @JoinColumn({
        name: 'ciudadano_id',
        referencedColumnName: 'id_ciudadano'
    })
    ciudadano: Ciudadano;
    //FIN CIUDADANO

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    disposicion: string;

    @Column({
        type: 'varchar',
        length: 2000,
        nullable: false
    })
    detalle: string;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_prohibicion: Date;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_inicio: Date;

    @Column({
        type: 'date',
        nullable: false
    })
    fecha_fin: Date;

    @Column({
        type: "boolean",
        default: true
    })
    vigente: boolean;

}

