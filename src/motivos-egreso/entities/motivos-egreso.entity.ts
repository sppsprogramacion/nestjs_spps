import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('motivos_egreso')
export class MotivoEgreso {

    @PrimaryGeneratedColumn()
    id_motivo_egreso: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    motivo_egreso: string

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
    
}
