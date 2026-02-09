import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tipos_delito')
export class TipoDelito {

    @PrimaryGeneratedColumn()
    id_tipo_delito: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique:  true
    })
    tipo_delito: string
}
