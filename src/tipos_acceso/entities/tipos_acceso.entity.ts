import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipos_accesos')
export class TipoAcceso {

    @PrimaryGeneratedColumn()
    id_tipo_acceso: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    tipo_acceso: string
}
