import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('niveles_educacion')
export class NivelEducacion {
    @PrimaryGeneratedColumn()
    id_nivel_educacion: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    nivel_educacion: string
}
