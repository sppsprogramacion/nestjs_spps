import { Column, PrimaryGeneratedColumn } from "typeorm";


export class HuellaCambio {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        unsigned: true
    })
    version: string;

    @Column({
        type: 'bigint',
        unsigned: true
    })
    huella_id: string;

    @Column({
        type: 'enum',
        enum: ['ALTA', 'BAJA']
    })
    accion: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP'
    })
    fecha: Date;
}
