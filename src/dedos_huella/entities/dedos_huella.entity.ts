import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('dedos_huella')
export class DedoHuella {

    @PrimaryGeneratedColumn()
    id_dedo_huella: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    dedo_huella: string

}
