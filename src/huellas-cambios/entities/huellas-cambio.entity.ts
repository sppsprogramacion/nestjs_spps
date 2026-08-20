import { Huella } from "src/huellas/entities/huella.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('huellas_cambios')
export class HuellaCambio {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    version: string;


    @Column({
        type: 'int',
        nullable: false
    })
    huella_id: number;

    @ManyToOne(() => Huella, { eager: false })
    @JoinColumn({
        name: 'huella_id',
        referencedColumnName: 'id_huella_ciudadano'
    })
    huella: Huella;


    @Column({
        type: 'enum',
        enum: ['ALTA', 'BAJA'],
        nullable: false
    })
    accion: 'ALTA' | 'BAJA';


    @Column({
        type: 'datetime',
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha: Date;

}
