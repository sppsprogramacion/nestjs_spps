import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('ocupaciones')
export class Ocupacion {
    @PrimaryGeneratedColumn()
    id_ocupacion: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    ocupacion: string
}
