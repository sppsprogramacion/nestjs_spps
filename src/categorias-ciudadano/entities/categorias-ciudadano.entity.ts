import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categorias_ciudadano')
export class CategoriaCiudadano {

    @PrimaryGeneratedColumn()
    id_categoria_ciudadano: number;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
        unique: true
    })
    categoria_ciudadano: string
}
