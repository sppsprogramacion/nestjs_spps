import { Ciudadano } from "src/ciudadanos/entities/ciudadano.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('sexo')
export class Sexo {

    @PrimaryGeneratedColumn()
    id_sexo: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    sexo: string

   
}
