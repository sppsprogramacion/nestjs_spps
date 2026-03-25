import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipos_historial_procesal')
export class TipoHistorialPocesal {
    
    @PrimaryGeneratedColumn()
    id_tipo_historial_procesal: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    tipo_historial_procesal: string
}
