import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('conducta')
export class Conducta {

    @PrimaryGeneratedColumn()
    id_conducta: number;
    
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    conducta: string

    @Column({
        type: "boolean",
        default: true
    })
    activo: boolean;
}
