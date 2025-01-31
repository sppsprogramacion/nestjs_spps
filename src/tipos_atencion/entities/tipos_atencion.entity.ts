import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipos_atencion')
export class TipoAtencion {

    @PrimaryGeneratedColumn()
    id_tipo_atencion: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    tipo_atencion: string
}
