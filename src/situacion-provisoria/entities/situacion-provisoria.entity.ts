import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('situacion_provisoria')
export class SituacionProvisoria {

    @PrimaryGeneratedColumn()
    id_situacion_provisoria: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    situacion_provisoria: string

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
}
